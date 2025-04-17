import { RayVector, Vector } from "../../../utils/Vector";
import { Bullet } from "../../entity/Bullet";
import { Entity } from "../../entity/Entity";
import { EntityManager } from "../EntityManager";
import { DamageSystem } from "./DamageSystem";
import { TaskManager, TimeoutTask } from "../TaskManager";

import { Player, Entity as mcEntity, world } from "@minecraft/server";
import { Vector3 } from "@minecraft/server";
import { GunSystemManager } from "./gun/GunSystemManager";

export class BulletHandler {
    
    readonly owner: Player;
    readonly gun: Entity;

    private _bullet: Entity;
    private _projectile: mcEntity;

    constructor(owner: Player, gun: Entity, offset: number) {
        this.owner = owner;
        this.gun = gun;

        [this._bullet, this._projectile] = this.spawn(offset);
    }

    private spawn(offset: number): [Entity, mcEntity] {
        const viewDirection = this.owner.getViewDirection();
        const headLocation = this.owner.getHeadLocation();
        const damageComp = this.gun.getComponent('damage')!;

        const bullet = new Bullet();

        const bulletComp = bullet.getComponent('bullet')!;
        bulletComp.register(this.owner, damageComp);

        const position = bullet.getComponent('position')!;
        position.x = headLocation.x + viewDirection.x;
        position.y = headLocation.y + viewDirection.y + 0.1;
        position.z = headLocation.z + viewDirection.z;

        const projectile = this.owner.dimension.spawnEntity('xigmaguns:bullet', position);

        const projComp = projectile.getComponent('projectile')!;
        projComp.owner = this.owner;
        projComp.shoot(Vector.mul(viewDirection, 200), { uncertainty: offset });

        EntityManager.registerEntity(bullet, projectile);
        
        this.addInterruptionProcess();
        return [bullet, projectile];
    }

    private addInterruptionProcess() {

        const projectileHitBlockListener = world.afterEvents.projectileHitBlock.subscribe(ev => {
            if (ev.projectile.id !== this._projectile.id) return;
            this.spawnTrajectory(ev.location);
            despawn();
        });

        const projectileHitEntityListener = world.afterEvents.projectileHitEntity.subscribe(ev => {
            if (ev.projectile.id !== this._projectile.id) return;
            const target = ev.getEntityHit().entity!;
            new DamageSystem(this.owner, target).applyGunDamage(this._bullet, ev.location);
            this.spawnTrajectory(ev.location);
            despawn();
        });

        const taskId = TaskManager.executeTask(new TimeoutTask({
            delay: 2,
            executeFunction: () => {
                if (!this._projectile.isValid()) return;
                this.spawnTrajectory(this._projectile.location);
                despawn();
            }
        }));

        const despawn = () => {
            EntityManager.unRegisterEntity(this._bullet.uuid);
            world.afterEvents.projectileHitBlock.unsubscribe(projectileHitBlockListener!);
            world.afterEvents.projectileHitEntity.unsubscribe(projectileHitEntityListener!);
            TaskManager.removeTask(taskId);
            this._projectile.remove();
        }

    }

    private spawnTrajectory(dest: Vector3) {

        const position = this._bullet.getComponent('position')!;
        const rayVector = new RayVector(position, dest);
        const unitVector = rayVector.unit;

        let currentPos = { x: position.x, y: position.y, z: position.z };
        const startPoint = currentPos;

        let distance = 0;
        while (true) {
            currentPos = Vector.add(currentPos, Vector.div(unitVector, 10));

            if (distance++ < 10) continue;
            try { this._projectile.dimension.spawnParticle('xigmaguns:locus', currentPos); } catch { }

            const currentDist = Vector.distance(startPoint, currentPos);

            if (rayVector.length <= currentDist) break;
        }
    }

}