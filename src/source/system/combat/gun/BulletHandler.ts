import { Vector } from "../../../../utils/Vector";
import { Bullet } from "../../../entity/Bullet";
import { Entity } from "../../../entity/Entity";
import { EntityManager } from "../../EntityManager";
import { DamageSystem } from "./DamageSystem";
import { TaskManager, TimeoutTask } from "../../TaskManager";

import { Player, Entity as mcEntity, world } from "@minecraft/server";
import { ProjectileHitBlockAfterEvent, ProjectileHitEntityAfterEvent } from "@minecraft/server";
import { Vector3 } from "@minecraft/server";

export class BulletHandler {
    
    readonly owner: Player;
    readonly gun: Entity;

    private _bullet: Entity;
    private _projectile: mcEntity;
    
    private _projectileHitBlockListener?: EventType<ProjectileHitBlockAfterEvent>;
    private _projectileHitEntityListener?: EventType<ProjectileHitEntityAfterEvent>;
    private _taskId: number = -1;

    constructor(owner: Player, gun: Entity) {
        this.owner = owner;
        this.gun = gun;

        [this._bullet, this._projectile] = this.spawn();
    }

    private spawn(): [Entity, mcEntity] {
        const viewDirection = this.owner.getViewDirection();
        const headLocation = this.owner.getHeadLocation();
        const damageComp = this.gun.getComponent('damage')!;

        const bullet = new Bullet();

        const bulletComp = bullet.getComponent('bullet')!;
        bulletComp.init(this.owner, damageComp);

        const position = bullet.getComponent('position')!;
        position.x = headLocation.x + viewDirection.x;
        position.y = headLocation.y + viewDirection.y + 0.1;
        position.z = headLocation.z + viewDirection.z;

        const projectile = this.owner.dimension.spawnEntity('xigmaguns:bullet', position);

        const projComp = projectile.getComponent('projectile')!;
        projComp.owner = this.owner;
        projComp.shoot(Vector.mul(viewDirection, 200), { uncertainty: this.owner.getDynamicProperty('xigmaguns:offset') as number });
        
        const vector = bullet.getComponent('vector')!;
        vector.setVector(viewDirection);

        EntityManager.registerEntity(bullet, projectile);
        
        this.addInterruptionProcess();
        return [bullet, projectile];
    }

    private addInterruptionProcess() {

        this._projectileHitBlockListener = world.afterEvents.projectileHitBlock.subscribe(ev => {
            if (ev.projectile.id !== this._projectile.id) return;
            this.spawnTrajectory(ev.location);
            this.despawn();
        });

        this._projectileHitEntityListener = world.afterEvents.projectileHitEntity.subscribe(ev => {
            if (ev.projectile.id !== this._projectile.id) return;
            const target = ev.getEntityHit().entity!;
            new DamageSystem(this.owner, target).applyGunDamage(this._bullet, ev.location);
            this.spawnTrajectory(ev.location);
            this.despawn();
        });

        this._taskId = TaskManager.executeTask(new TimeoutTask({
            delay: 2,
            executeFunction: () => {
                if (!this._projectile.isValid()) return;
                this.spawnTrajectory(this._projectile.location);
                this.despawn();
            }
        }));

    }

    private despawn() {
        EntityManager.unRegisterEntity(this._bullet.uuid);
        world.afterEvents.projectileHitBlock.unsubscribe(this._projectileHitBlockListener!);
        world.afterEvents.projectileHitEntity.unsubscribe(this._projectileHitEntityListener!);
        TaskManager.removeTask(this._taskId);
        this._projectile.remove();
    }

    private spawnTrajectory(dest: Vector3) {

        const position = this._bullet.getComponent('position')!;
        const vector = this._bullet.getComponent('vector')!;

        let currentPos = { x: position.x, y: position.y, z: position.z }
        const startPoint = currentPos;
        const pos2dest = Vector.distance(startPoint, dest);

        let distance = 0;
        while (true) {
            currentPos = Vector.add(currentPos, Vector.div(vector, 10));

            if (distance++ < 10) continue;
            try { this._projectile.dimension.spawnParticle('xigmaguns:locus', currentPos); } catch { }

            const currentDist = Vector.distance(currentPos, startPoint);

            if (pos2dest <= currentDist) break;
        }
    }

}