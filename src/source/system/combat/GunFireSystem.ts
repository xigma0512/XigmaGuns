import { Entity } from "../../entity/Entity";
import { MagazineComponent } from "../../components/MagazineComponent";
import { BulletSystem } from "./BulletSystem";
import { GunComponent } from "../../components/GunComponent";

import { IntervalTask, TaskManager } from "../TaskManager";
import { EntityManager } from "../EntityManager";

import { world } from "@minecraft/server";
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
                    return BulletSystem.summonBullet(owner, gunComp);
                }
                owner.onScreenDisplay.setActionBar('YOU HAVE NO AMMO.');
            }
        });
        this.fireInterruption(TaskManager.executeTask(task), owner.name);

        return true;
    }
    
    private static fireInterruption(taskId: number, ownerName: string) {
        const [stopUseItem, playerDie] = [
            world.afterEvents.itemStopUse.subscribe(ev => {
                if (ev.source.name === ownerName) stopFire();
            }),
            world.afterEvents.entityDie.subscribe(ev => {
                if (!(ev.deadEntity instanceof Player)) return;
                if (ev.deadEntity.name === ownerName) stopFire();
            })
        ];

        const stopFire = () => {
            TaskManager.removeTask(taskId);
            world.afterEvents.itemStopUse.unsubscribe(stopUseItem);
            world.afterEvents.entityDie.subscribe(playerDie);
        }
    }

    private static consumeAmmo(entity: Entity) {
        const magazineComp = entity.getComponent('magazine') as MagazineComponent;
        if (magazineComp.ammo === 0) return false;
        magazineComp.ammo--;
        return true;
    }

}