import { BulletSystem } from "./BulletSystem";
import { ElementManager } from "../../ElementManager";
import { TaskManager, TimeoutTask } from "../../TaskManager";
import { DamageSystem } from "../DamageSystem";
import { Vector } from "../../../../utils/Vector";
import { Utils } from "../../../../utils/Utils";
import { world } from "@minecraft/server";
export class BulletHandler {
    owner;
    constructor(owner) {
        this.owner = owner;
    }
    launch(offset) {
        const handWeapon = Utils.getHandEquippedItemElement(this.owner);
        const { bullet, projectile } = BulletSystem.instance.spawnBullet(this.owner, handWeapon.typeId);
        const projectileComponent = projectile.getComponent('projectile');
        projectileComponent.owner = this.owner;
        projectileComponent.shoot(Vector.mul(this.owner.getViewDirection(), 1000), { uncertainty: offset });
        BulletSystem.instance.spawnTrajectory(projectile.location, projectile.getVelocity(), this.owner.dimension);
        this._addImpactListener(bullet.uuid, projectile);
    }
    _addImpactListener(uuid, projectile) {
        const projectileHitEntity = world.afterEvents.projectileHitEntity.subscribe(ev => {
            const entity = ElementManager.getElement(ev.projectile);
            if (entity === undefined)
                return;
            if (entity.uuid !== uuid)
                return;
            new DamageSystem(this.owner, ev.getEntityHit().entity).applyGunDamage(entity, ev.location);
            world.afterEvents.projectileHitEntity.unsubscribe(projectileHitEntity);
        });
        TaskManager.executeTask(new TimeoutTask({
            delay: 1,
            executeFunction: () => {
                if (!projectile.isValid)
                    return;
                projectile.remove();
            }
        }));
    }
}
//# sourceMappingURL=BulletHandler.js.map