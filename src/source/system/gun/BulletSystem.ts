import { Bullet } from "../../entity/Bullet";
import { EntityManager } from "../EntityManager";

import { BulletComponent } from "../../components/BulletComponent";
import { PositionComponent } from "../../components/PositionComponent";
import { VectorComponent } from "../../components/VectorComponent";
import { ParticleComponent } from "../../components/ParticleComponent";
import { GunComponent } from "../../components/GunComponent";

import { Utils } from "../../../utils/Utils";

import { world } from "@minecraft/server";
import { Player } from "@minecraft/server";

export class BulletSystem {

    static summonBullet(owner: Player, comp: GunComponent) {
        const entity = new Bullet();
        EntityManager.registerEntity(entity);

        const bulletComp = entity.getComponent('bullet') as BulletComponent;
        bulletComp.setInfo(owner, comp.damage, comp.range);

        const positionComp = entity.getComponent('position') as PositionComponent;
        const head = owner.getHeadLocation();
        positionComp.x = head.x;
        positionComp.y = head.y + 0.1;
        positionComp.z = head.z;
        positionComp.dimension = owner.dimension.id;
        
        const vectorComp = entity.getComponent('vector') as VectorComponent;
        vectorComp.setVector(owner.getViewDirection());
        
        return entity;
    }

    static launchBullet(entity: Bullet) {
        let dist = 0;
        while(true) {
            const bulletComp = entity.getComponent('bullet') as BulletComponent;
            const position = entity.getComponent('position') as PositionComponent;
            const particle = entity.getComponent('particle') as ParticleComponent;
            const vector = entity.getComponent('vector') as VectorComponent;

            const hitBlock = BulletState.getBlockHit(entity);
            if (!(hitBlock === undefined || hitBlock.isAir)) break;
            
            const hitPlayer = BulletState.getPlayerHit(entity);
            if (hitPlayer) {
                Utils.applyDamage(hitPlayer.target, bulletComp.owner as Player, bulletComp.damage);
                break;
            }
            
            if (dist >= 10) 
                world.getDimension(position.dimension).spawnParticle(particle.typeId, {x: position.x, y: position.y, z: position.z});
            
            position.x += vector.x;
            position.y += vector.y;
            position.z += vector.z;
            dist ++;

            if (dist >= bulletComp.range * 10) break;
        }
        EntityManager.unRegisterEntity(entity.uuid);
    }
}

class BulletState {
    
    static getBlockHit(bullet: Bullet) {
        const position = bullet.getComponent('position') as PositionComponent;
        const block = world.getDimension(position.dimension).getBlock({ x: position.x, y: position.y, z: position.z});
        return block;
    }

    static getPlayerHit(bullet: Bullet) {
        const bulletComp = bullet.getComponent('bullet') as BulletComponent;
        const position = bullet.getComponent('position') as PositionComponent;

        for (const target of world.getAllPlayers()) {

            if (target.name === bulletComp.owner?.name) continue;
            const pos = target.location;

            const distance = {
                x: Math.abs(position.x - pos.x),
                y: position.y - pos.y,
                z: Math.abs(position.z - pos.z)
            }

            if (distance.x > 0.3 || distance.z > 0.3) continue;
            if (distance.y > 1.8 || distance.y < 0) continue;
            if (Math.abs(distance.y) <= 0.8) return { target, type: 'leg' };
            if (Math.abs(distance.y) <= 1.45) return { target, type: 'body' };
            return { target, type: 'head' };
        }
    }

}