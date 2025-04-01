import { TaskManager, TimeoutTask } from "../../TaskManager";
import { FlashbangHandler, GrenadeHandler, SmokeGrenadeHandler } from "./GrenadeHandlers";
import { Vector } from "../../../../utils/Vector";

import { world } from "@minecraft/server";
import { Dimension } from "@minecraft/server";
import { Entity as mcEntity, Player, ItemStack } from "@minecraft/server";
import { Direction, Vector3 } from "@minecraft/server";
import { ProjectileHitBlockAfterEvent } from "@minecraft/server";

export class Grenade {

    readonly handler: GrenadeHandler;

    constructor(projectile: mcEntity) {
        this.handler = this.setHandler(projectile);
        this.projectileRebound();
    }

    private setHandler(projectile: mcEntity) {
        const family = projectile.getComponent('type_family');
        if (family !== undefined) {
            if (family.hasTypeFamily('smoke_grenade')) return new SmokeGrenadeHandler(projectile);
            if (family.hasTypeFamily('flashbang')) return new FlashbangHandler(projectile);
        }
        throw "[ERROR] 無法找到對應的 Grenade 類型";
    }

    private projectileRebound() {
        
        const mirrored = {
            [Direction.Down]: {x:1,y:-1,z:1},
            [Direction.Up]: {x:1,y:-1,z:1},
            [Direction.West]: {x:-1,y:1,z:1},
            [Direction.East]: {x:-1,y:1,z:1},
            [Direction.North]: {x:1,y:1,z:-1},
            [Direction.South]: {x:1,y:1,z:-1},
        };

        const bounces = new WeakMap<mcEntity, number>();
        const hitBlockRebound = async (ev: ProjectileHitBlockAfterEvent) => {
            if (ev.projectile.id !== this.handler.projectile.id) return;
            
            const projectile = this.handler.projectile;
            const hitBlockInfo = ev.getBlockHit();

            if (!bounces.has(projectile)) bounces.set(projectile, 1);
            const count = bounces.get(projectile)!;
            
            const entity = this.spawnClone(ev.dimension, Vector.add(hitBlockInfo.block.location, Vector.mul(hitBlockInfo.faceLocation, 1.001)));
            this.handler.projectile = entity;
            bounces.set(entity, count + 1);
            
            const decreaseValue = (this.handler.variant === 0 ? 0.6 : 0.2);
            entity.getComponent('projectile')!.shoot(
                Vector.mul(Vector.mul(ev.hitVector, Math.pow(decreaseValue, count)), mirrored[hitBlockInfo.face])
            );
        }

        const projectileHitBlock = world.afterEvents.projectileHitBlock.subscribe(hitBlockRebound);

        TaskManager.executeTask(new TimeoutTask({
            delay: this.handler.executeDelay,
            executeFunction: () => {
                this.handler.execute();
                world.afterEvents.projectileHitBlock.unsubscribe(projectileHitBlock);
            }
        }));
    }

    private spawnClone(dimension: Dimension, location: Vector3) {
        const typeId = this.handler.projectile.typeId;
        const throwingType = (this.handler.variant === 0 ? '<set_overhand>' : '<set_underhand>');

        const entity = dimension.spawnEntity(typeId + throwingType, location);
        entity.addTag('rebound');
        return entity;
    }

    static throwing(owner: Player, grenadeItem: ItemStack) {
        
        const triggers = {
            'xigmaguns:smoke_grenade': 'throwing_smoke_grenade',
            'xigmaguns:flashbang': 'throwing_flashbang'
        };

        for (const [grenadeType, eventName] of Object.entries(triggers)) {
            if (grenadeItem.hasTag(grenadeType)) owner.triggerEvent(eventName);
        }
    }

}