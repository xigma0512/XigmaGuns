import { Bullet } from "../../entity/Bullet";
import { Entity } from "../../entity/Entity";
import { EntityManager } from "../EntityManager";
import { TaskManager, TimeoutTask } from "../TaskManager";

import { Player, Entity as mcEntity } from "@minecraft/server";
import { Vector3 } from "@minecraft/server";

export class BulletSystem {

    static spawnBullet(owner: Player, gun: Entity) {
        const viewDirection = owner.getViewDirection();
        const headLocation = owner.getHeadLocation();
        const [damageComp, gunComp] = [gun.getComponent('damage')!, gun.getComponent('gun')!];

        const bullet = new Bullet();
        const bulletComp = bullet.getComponent('bullet')!;
        bulletComp.init(owner, damageComp);

        const position = bullet.getComponent('position')!;
        position.x = headLocation.x + viewDirection.x;
        position.y = headLocation.y + viewDirection.y + 0.1;
        position.z = headLocation.z + viewDirection.z;

        const bulletEntity = owner.dimension.spawnEntity('xigmaguns:bullet', {
            x: position.x,
            y: position.y,
            z: position.z
        });

        const projectile = bulletEntity.getComponent('projectile')!;
        projectile.owner = owner;
        projectile.shoot({
            x: viewDirection.x * 200,
            y: viewDirection.y * 200,
            z: viewDirection.z * 200,
        }, { uncertainty: gunComp.offset });

        const vector = bullet.getComponent('vector')!;
        const projectileVec = bulletEntity.getVelocity();
        projectileVec.x /= 200;
        projectileVec.y /= 200;
        projectileVec.z /= 200;
        vector.setVector(projectileVec);

        EntityManager.registerEntity(bullet, bulletEntity);
        TaskManager.executeTask(new TimeoutTask({
            delay: 2,
            executeFunction: () => this.spawnTrajectory(bulletEntity, bulletEntity.location)
        }));
    }

    static spawnTrajectory(bulletEntity: mcEntity, dest: Vector3) {

        if (bulletEntity.getDynamicProperty('xigmaguns:already_spawn_trajectory')) return;
        bulletEntity.setDynamicProperty('xigmaguns:already_spawn_trajectory', true);

        const bullet = EntityManager.getEntity(bulletEntity);
        if (bullet === undefined) return;

        const position = bullet.getComponent('position')!;
        const vector = bullet.getComponent('vector')!;

        const originPosition = { x: position.x, y: position.y, z: position.z };
        const [dx, dy, dz] = [dest.x - position.x, dest.y - position.y, dest.z - position.z];
        const pos2dest = Math.sqrt(dx * dx + dy * dy + dz * dz);

        let distance = 0;
        while (true) {
            if (distance++ < 15) continue;

            try { bulletEntity.dimension.spawnParticle('xigmaguns:locus', { x: position.x, y: position.y, z: position.z }); } catch { }

            position.x += vector.x / 5;
            position.y += vector.y / 5;
            position.z += vector.z / 5;

            const [cdx, cdy, cdz] = [originPosition.x - position.x, originPosition.y - position.y, originPosition.z - position.z];
            const currentDist = Math.sqrt(cdx * cdx + cdy * cdy + cdz * cdz);

            if (pos2dest <= currentDist) break;
        }
    }

}