import { Bullets, GunTypes } from "../../../../declare/entity/BulletTypes";
import { RayVector, Vector } from "../../../../utils/Vector";
import { IEntity } from "../../../entity/Entity";
import { EntityManager } from "../../EntityManager";

import { Dimension, Player, system, world } from "@minecraft/server";
import { Vector3 } from "@minecraft/server";

export class BulletSystem {

    private static _instance: BulletSystem;
    static get instance() { return (this._instance || (this._instance = new this())); }
    private _bullets: Map<string, IEntity>;

    private constructor() {
        this._bullets = new Map<string, IEntity>();
    }

    spawnBullet(owner: Player, gunType: GunTypes) {
        const bullet = new Bullets[gunType](owner);
        this._bullets.set(bullet.uuid, bullet);
        this._addClearListener(bullet.uuid);

        const headLocation = owner.getHeadLocation();
        const viewDirection = owner.getViewDirection();
        const spawnLocation = {
            x: headLocation.x + viewDirection.x,
            y: headLocation.y + viewDirection.y + 0.1,
            z: headLocation.z + viewDirection.z
        };

        const projectile = owner.dimension.spawnEntity('xigmaguns:bullet', spawnLocation);
        EntityManager.registerEntity(bullet, projectile);

        return {bullet, projectile};
    }

    spawnTrajectory(from: Vector3, to: Vector3, dimension: Dimension) {
        const rayVector = new RayVector(from, to);
        const unitVector = rayVector.unit;

        let currentPos = from;
        const startPoint = currentPos;

        let distance = 0;
        while (true) {
            currentPos = Vector.add(currentPos, Vector.div(unitVector, 10));

            if (distance++ < 10) continue;
            try { dimension.spawnParticle('xigmaguns:locus', currentPos); } catch { }

            const currentDist = Vector.distance(startPoint, currentPos);

            if (rayVector.length <= currentDist) break;
        }
    }

    private _addClearListener(uuid: string) {
        const entityRemove = world.beforeEvents.entityRemove.subscribe(ev => {
            const entity = EntityManager.getEntity(ev.removedEntity);
            if (entity === undefined) return;
            if (entity.uuid !== uuid) return;
            
            this._bullets.delete(uuid);
            EntityManager.unRegisterEntity(uuid);
            system.run(()=> world.beforeEvents.entityRemove.unsubscribe(entityRemove));
        });
    }

}