import { Bullet } from "../../entity/Bullet";
import { EntityManager } from "../EntityManager";

import { system } from "@minecraft/server";
import { Player, Entity as mcEntity } from "@minecraft/server";
import { Vector3 } from "@minecraft/server";
import { Entity } from "../../entity/Entity";
import { TaskManager, TimeoutTask } from "../TaskManager";

export class BulletSystem {

    static summonBullet(owner: Player, gunEntity: Entity) {
        const viewDirection = owner.getViewDirection();
        const headLocation = owner.getHeadLocation();
        const [damageComp, gunComp] = [gunEntity.getComponent('damage')!, gunEntity.getComponent('gun')!];

        const bullet = new Bullet();
        
        const bulletComp = bullet.getComponent('bullet')!;
        bulletComp.init(owner, damageComp);
        
        const position = bullet.getComponent('position')!;
        position.x = headLocation.x + viewDirection.x;
        position.y = headLocation.y + viewDirection.y + 0.1;
        position.z = headLocation.z + viewDirection.z;

        const entity = owner.dimension.spawnEntity('xigmaguns:bullet', {
            x: position.x,
            y: position.y,
            z: position.z
        });
        
        const projectile = entity.getComponent('projectile')!;
        projectile.owner = owner;
        projectile.shoot({
            x: viewDirection.x * 200,
            y: viewDirection.y * 200,
            z: viewDirection.z * 200,
        }, {uncertainty: gunComp.offset});

        const vector = bullet.getComponent('vector')!;
        const projectileVec = entity.getVelocity();
        projectileVec.x /= 200;
        projectileVec.y /= 200;
        projectileVec.z /= 200;
        vector.setVector(projectileVec);

        EntityManager.registerEntity(bullet, entity);
        TaskManager.executeTask(new TimeoutTask({
            delay: 2,
            executeFunction: () => BulletSystem.launchLocus(entity, entity.location)
        }));
    }

    static launchLocus(entity: mcEntity, dest: Vector3) {

        const bullet = EntityManager.getEntity(entity);
        if (bullet === undefined) return;

        if (entity.getDynamicProperty('xigmaguns:already_spawn_locus')) return;
        entity.setDynamicProperty('xigmaguns:already_spawn_locus', true);

        const position = bullet.getComponent('position')!;
        const vector = bullet.getComponent('vector')!;

        const originPosition = {x: position.x, y: position.y, z: position.z};
        const [dx, dy, dz] = [dest.x - position.x, dest.y - position.y, dest.z - position.z];
        const pos2dest = Math.sqrt(dx * dx + dy * dy + dz * dz);

        let distance = 0;
        while(true) {
            if (distance++ < 10) continue;
            
            try { entity.dimension.spawnParticle('xigmaguns:locus', { x: position.x, y: position.y, z: position.z} ); } catch { }
            
            position.x += vector.x / 5;
            position.y += vector.y / 5;
            position.z += vector.z / 5;

            const [cdx, cdy, cdz] = [originPosition.x - position.x, originPosition.y - position.y, originPosition.z - position.z];
            const currentDist = Math.sqrt(cdx * cdx + cdy * cdy + cdz * cdz);

            if (pos2dest <= currentDist) break;
        }
    }

    static getHitType(hitLocation: Vector3, target: Player): BulletHitType {
        const targetPosition = target.location;

        const distance = {
            x: Math.abs(hitLocation.x - targetPosition.x),
            y: hitLocation.y - targetPosition.y,
            z: Math.abs(hitLocation.z - targetPosition.z)
        }

        if (Math.abs(distance.y) <= 0.85) return 'legs';
        if (Math.abs(distance.y) <= 1.45) return 'body';
        return 'head';
    }
}