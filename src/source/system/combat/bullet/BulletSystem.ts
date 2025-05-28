import { Bullets, GunTypes } from "../../../../declare/element/BulletTypes";
import { RayVector, Vector } from "../../../../utils/Vector";
import { ElementManager } from "../../ElementManager";

import { Dimension, Player, system, world } from "@minecraft/server";
import { Vector3, VanillaEntityIdentifier } from "@minecraft/server";

export class BulletSystem {

    private static _instance: BulletSystem;
    static get instance() { return (this._instance || (this._instance = new this())); }

    private constructor() {
    }

    spawnBullet(owner: Player, gunType: GunTypes) {
        const bullet = new Bullets[gunType](owner);
        this._addClearListener(bullet.uuid);

        const headLocation = owner.getHeadLocation();
        const viewDirection = owner.getViewDirection();
        const spawnLocation = {
            x: headLocation.x + viewDirection.x,
            y: headLocation.y + viewDirection.y + 0.1,
            z: headLocation.z + viewDirection.z
        };

        const projectile = owner.dimension.spawnEntity('xigmaguns:bullet' as keyof VanillaEntityIdentifier, spawnLocation);
        ElementManager.createElement(bullet, projectile);

        return {bullet, projectile};
    }

    spawnTrajectory(from: Vector3, vec: Vector3, dimension: Dimension) {
        const rayVector = new RayVector({ x:0, y:0, z:0 }, vec);
        const unitVector = rayVector.unit;

        let currentPos = from;
        const startPoint = currentPos;

        let distance = 0;
        while (true) {
            currentPos = Vector.add(currentPos, Vector.div(unitVector, 3));

            if (distance++ < 5) continue;
            try { dimension.spawnParticle('xigmaguns:locus', currentPos); } catch { break; }

            const currentDist = Vector.distance(startPoint, currentPos);

            if (currentDist >= 100) break;
        }
    }

    private _addClearListener(uuid: string) {
        const entityRemove = world.beforeEvents.entityRemove.subscribe(ev => {
            const entity = ElementManager.getElement(ev.removedEntity);
            if (entity === undefined) return;
            if (entity.uuid !== uuid) return;
            
            system.run(() => {
                ElementManager.removeElement(uuid);
                world.beforeEvents.entityRemove.unsubscribe(entityRemove);
            });
        });
    }

}