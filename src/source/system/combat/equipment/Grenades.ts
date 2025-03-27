import { Vector } from "../../../../utils/Vector";

import { Direction, world } from "@minecraft/server";
import { Entity as mcEntity } from "@minecraft/server";
import { ProjectileHitBlockAfterEvent } from "@minecraft/server";

interface IGrenadeHandler {
    projectile: mcEntity;
    execute(): void;
}

class SmokeGrenadeHandler implements IGrenadeHandler {
    
    projectile: mcEntity;

    constructor(projectile: mcEntity) {
        this.projectile = projectile;
    }

    execute() {
        console.log('execute');
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
            if (!bounces.has(projectile)) bounces.set(projectile, 1);
            const count = bounces.get(projectile);

            const hitBlockInfo = ev.getBlockHit();
            const entity = ev.dimension.spawnEntity(
                ev.projectile.typeId,
                Vector.add(hitBlockInfo.block.location, Vector.mul(hitBlockInfo.faceLocation, 1.001))
            );
            
            const projComp = entity.getComponent('projectile')!;
            projComp.shoot(Vector.div(Vector.mul(projectile.getVelocity(), mirrored[hitBlockInfo.face]), count * 1.1));
            bounces.set(entity, count + 1);
            entity.addTag('rebound');
            
            this.handler.projectile = entity;
        }

        world.afterEvents.projectileHitBlock.subscribe(hitBlockRebound);

    }

}