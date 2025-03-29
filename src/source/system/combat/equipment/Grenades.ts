import { RayVector, Vector } from "../../../../utils/Vector";
import { IntervalTask, TaskManager, TimeoutTask } from "../../TaskManager";

import { Direction, world } from "@minecraft/server";
import { Entity as mcEntity } from "@minecraft/server";
import { ProjectileHitBlockAfterEvent } from "@minecraft/server";

interface IGrenadeHandler {
    readonly executeDelay: number;
    projectile: mcEntity;
    execute(): void;
}

class SmokeGrenadeHandler {
    
    readonly executeDelay = 70;
    private _projectile: mcEntity;

    get projectile() { return this._projectile; }
    set projectile(value: mcEntity) {
        this._projectile.remove();
        this._projectile = value;
    }

    constructor(projectile: mcEntity) {
        projectile.triggerEvent('throwing');
        this._projectile = projectile;
    }

    execute() {
        const dimension = this.projectile.dimension;
        const location = this.projectile.location;
        
        TaskManager.executeTask(new IntervalTask({
            duration: 300,
            tickFunction() {
                try { 
                    for (let i = 0; i < 2; i++) dimension.spawnParticle('minecraft:huge_explosion_emitter', location);
                } catch { }
            }
        }));
        this.projectile.triggerEvent('execute');
    }
}

export class Grenade {

    readonly handler: IGrenadeHandler;

    constructor(projectile: mcEntity) {
        this.handler = this.setHandler(projectile);
        this.projectileRebound();
    }

    private setHandler(projectile: mcEntity) {
        const family = projectile.getComponent('type_family');
        if (family !== undefined) {
            if (family.hasTypeFamily('smoke_grenade')) return new SmokeGrenadeHandler(projectile);
        }
        throw "[ERROR] 無法找到對應的 Grenade 類型";
    }

    private projectileRebound() {
        
        const mirrored = {
            [Direction.Down]:{x:1,y:-1,z:1},
            [Direction.Up]:{x:1,y:-1,z:1},
            [Direction.West]:{x:-1,y:1,z:1},
            [Direction.East]:{x:-1,y:1,z:1},
            [Direction.North]:{x:1,y:1,z:-1},
            [Direction.South]:{x:1,y:1,z:-1},
        };

        const bounces = new WeakMap();
        const hitBlockRebound = async (ev: ProjectileHitBlockAfterEvent) => {
            if (ev.projectile.id !== this.handler.projectile.id) return;
            
            const projectile = this.handler.projectile;
            if (!bounces.has(projectile)) bounces.set(projectile, 0);
            const count = bounces.get(projectile);
            const hitBlockInfo = ev.getBlockHit();
            const entity = ev.dimension.spawnEntity(
                projectile.typeId,
                Vector.add(hitBlockInfo.block.location, Vector.mul(hitBlockInfo.faceLocation, 1.001))
            );
            
            const projComp = entity.getComponent('projectile')!;
            projComp.shoot(Vector.mul(Vector.mul(ev.hitVector, Math.pow(0.5, count)), mirrored[hitBlockInfo.face]));
            
            entity.addTag('rebound');
            bounces.set(entity, count + 1);
            this.handler.projectile = entity;
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

}