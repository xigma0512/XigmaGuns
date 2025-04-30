import { BulletSystem } from "./BulletSystem";
import { GunTypes } from "../../../../declare/element/BulletTypes";
import { ElementManager } from "../../ElementManager";
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
        const handWeapon = Utils.getHandEquippedItemElement(this.owner);
        const {bullet, projectile} = BulletSystem.instance.spawnBullet(this.owner, handWeapon!.typeId as GunTypes);
        
        const projectileComponent = projectile.getComponent('projectile')!;
        projectileComponent.owner = this.owner;
        projectileComponent.shoot(Vector.mul(this.owner.getViewDirection(), 1000), { uncertainty: offset });

        BulletSystem.instance.spawnTrajectory(projectile.location, projectile.getVelocity(), this.owner.dimension);
        
        this._addImpactListener(bullet.uuid, projectile);
    }

    private _addImpactListener(uuid: string, projectile: Entity) {

        const projectileHitEntity = world.afterEvents.projectileHitEntity.subscribe(ev => {
            const entity = ElementManager.getElement(ev.projectile);
            if (entity === undefined) return;
            if (entity.uuid !== uuid) return;

            new DamageSystem(this.owner, ev.source!).applyGunDamage(entity, ev.location);
            
            world.afterEvents.projectileHitEntity.unsubscribe(projectileHitEntity);
            projectile.remove();
        });

        TaskManager.executeTask(new TimeoutTask({
            delay: 1,
            executeFunction: () => {
                if (!projectile.isValid) return;
                projectile.remove();
            }
        }));
        
    }

}