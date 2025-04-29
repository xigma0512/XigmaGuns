import { BulletSystem } from "./BulletSystem";
import { GunTypes } from "../../../../declare/entity/BulletTypes";
import { EntityManager } from "../../EntityManager";
import { TaskManager, TimeoutTask } from "../../TaskManager";
import { DamageSystem } from "../DamageSystem";

import { Vector } from "../../../../utils/Vector";
import { Utils } from "../../../../utils/Utils";

import { Entity, Player, world } from "@minecraft/server";

export class BulletHandler {

    readonly owner: Player;

    constructor(owner: Player) {
        this.owner = owner;
    }

    launch(offset: number) {
        const handWeapon = Utils.getHandEquippedItemEntity(this.owner);
        const {bullet, projectile} = BulletSystem.instance.spawnBullet(this.owner, handWeapon!.typeId as GunTypes);
        
        const projectileComponent = projectile.getComponent('projectile')!;
        projectileComponent.owner = this.owner;
        projectileComponent.shoot(Vector.mul(this.owner.getViewDirection(), 1000), { uncertainty: offset });

        this._addImpactListener(bullet.uuid, projectile);
    }

    private _addImpactListener(uuid: string, projectile: Entity) {

        const projectileHitBlock = world.afterEvents.projectileHitBlock.subscribe(ev => {
            if (!ev.projectile.isValid) return;
            const entity = EntityManager.getEntity(ev.projectile);
            if (entity === undefined) return;
            if (entity.uuid !== uuid) return;

            const spawnLocation = Vector.add(ev.source!.getHeadLocation(), {x:0, y:0.1, z:0});
            BulletSystem.instance.spawnTrajectory(spawnLocation, ev.location, ev.dimension);
            despawn(projectile);
        });

        const projectileHitEntity = world.afterEvents.projectileHitEntity.subscribe(ev => {
            if (!ev.projectile.isValid) return;
            const entity = EntityManager.getEntity(ev.projectile);
            if (entity === undefined) return;
            if (entity.uuid !== uuid) return;

            new DamageSystem(this.owner, ev.source!).applyGunDamage(entity, ev.location);

            const spawnLocation = Vector.add(ev.source!.getHeadLocation(), {x:0, y:0.1, z:0});
            BulletSystem.instance.spawnTrajectory(spawnLocation, ev.location, ev.dimension);
            despawn(projectile);
        });

        const taskId = TaskManager.executeTask(new TimeoutTask({
            delay: 2,
            executeFunction: () => {
                if (!projectile.isValid) return;
                const spawnLocation = Vector.add(this.owner.getHeadLocation(), {x:0, y:0.1, z:0});
                BulletSystem.instance.spawnTrajectory(spawnLocation, projectile.location, this.owner.dimension);
                despawn(projectile);
            }
        }));

        function despawn(entity: Entity) {
            world.afterEvents.projectileHitBlock.unsubscribe(projectileHitBlock);
            world.afterEvents.projectileHitEntity.unsubscribe(projectileHitEntity);
            TaskManager.removeTask(taskId);
            entity.remove();
        }
    }

}