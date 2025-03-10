import { Bullet } from "../../entity/Bullet";
import { EntityManager } from "../EntityManager";

import { system } from "@minecraft/server";
import { Player, Entity as mcEntity } from "@minecraft/server";
import { EntityProjectileComponent } from "@minecraft/server";
import { Vector3 } from "@minecraft/server";
import { Entity } from "../../entity/Entity";

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
        const projectileVec = projectile.entity.getVelocity();
        projectileVec.x /= 200;
        projectileVec.y /= 200;
        projectileVec.z /= 200;
        vector.setVector(projectileVec);

        EntityManager.registerEntity(bullet, entity);
        system.run(() => BulletSystem.launchLocus(entity, entity.location));
        // BUG: 第一發子彈會無法顯示粒子
        // 原因是 `entity.location` 依舊停留在射擊點
        // 但是子彈在system.run執行的這個時刻 已經射擊出去了 (確定，因為有擊中生物)
        // 並且無法解釋為什麼 連續射擊的第二發不會有這個問題
    }

    static launchLocus(entity: mcEntity, dest: Vector3) {

        const bullet = EntityManager.getEntity(entity);
        if (bullet === undefined) return;

        const bulletComp = bullet.getComponent('bullet')!;
        const position = bullet.getComponent('position')!;
        const vector = bullet.getComponent('vector')!;

        let distance = 0;
        while(true) {
            if (distance++ < 10) continue;
            
            try { entity.dimension.spawnParticle('xigmaguns:locus', { x: position.x, y: position.y, z: position.z}); } catch { }
            
            position.x += vector.x / 5;
            position.y += vector.y / 5;
            position.z += vector.z / 5;

            const dx = dest.x - position.x;
            const dy = dest.y - position.y;
            const dz = dest.z - position.z;
            const vec2dest = Math.sqrt(dx * dx + dy * dy + dz * dz);
            const vecLength = Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z);

            if (vec2dest <= vecLength) break;
        }

        EntityManager.unRegisterEntity(bullet.uuid);
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