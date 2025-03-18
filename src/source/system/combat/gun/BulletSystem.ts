import { Vector } from "../../../../utils/Vector";
import { Bullet } from "../../../entity/Bullet";
import { Entity } from "../../../entity/Entity";
import { EntityManager } from "../../EntityManager";
import { TaskManager, TimeoutTask } from "../../TaskManager";

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

        const bulletEntity = owner.dimension.spawnEntity('xigmaguns:bullet', position);

        const projectile = bulletEntity.getComponent('projectile')!;
        projectile.owner = owner;
        projectile.shoot(Vector.mul(viewDirection, 200), { uncertainty: gunComp.offset });

        const vector = bullet.getComponent('vector')!;
        vector.setVector(viewDirection);

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

        let currentPos = { x: position.x, y: position.y, z: position.z }
        const startPoint = currentPos;
        const pos2dest = Vector.distance(startPoint, dest);

        let distance = 0;
        while (true) {
            currentPos = Vector.add(currentPos, Vector.div(vector, 10));
            
            if (distance++ < 10) continue;
            try { bulletEntity.dimension.spawnParticle('xigmaguns:locus', currentPos); } catch { }

            const currentDist = Vector.distance(currentPos, startPoint);

            if (pos2dest <= currentDist) break;
        }
    }

}