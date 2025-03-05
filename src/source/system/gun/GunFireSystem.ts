import { Entity } from "../../entity/Entity";
import { MagazineComponent } from "../../components/MagazineComponent";
import { BulletSystem } from "./BulletSystem";
import { GunComponent } from "../../components/GunComponent";

import { IntervalTask, TaskManager } from "../timer/TaskManager";
import { EntityManager } from "../EntityManager";

import { ItemStack, Player } from "@minecraft/server";

export class GunFireSystem {

    static startFire(item: ItemStack, owner: Player) {
        
        const entity = EntityManager.getEntity(item) as Entity;
        if (entity === undefined) return false;

        const gunComp = entity.getComponent('gun') as GunComponent;

        const task = new IntervalTask({
            duration: 3600,
            interval: gunComp.fireRate,
            tickFunction() {
                if (GunFireSystem.consumeAmmo(entity)) {
                    const bullet = BulletSystem.summonBullet(owner, gunComp);
                    return BulletSystem.launchBullet(bullet);
                }
                owner.onScreenDisplay.setActionBar('YOU HAVE NO AMMO.');
            }
        });
        owner.setDynamicProperty('xigmaguns:task.fire', TaskManager.executeTask(task));

        return true;
    }
    
    static stopFire(item: ItemStack, owner: Player) {

        const entity = EntityManager.getEntity(item) as Entity;
        if (entity === undefined) return false;

        const taskId = owner.getDynamicProperty('xigmaguns:task.fire') as number;
        TaskManager.removeTask(taskId);
        
        return true;
    }

    private static consumeAmmo(entity: Entity) {
        const magazineComp = entity.getComponent('magazine') as MagazineComponent;
        if (magazineComp.ammo === 0) return false;
        magazineComp.ammo--;
        return true;
    }

}