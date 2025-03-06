import { Entity } from "../../entity/Entity";
import { MagazineComponent } from "../../components/MagazineComponent";
import { BulletSystem } from "./BulletSystem";
import { GunComponent } from "../../components/GunComponent";

import { IntervalTask, TaskManager } from "../timer/TaskManager";
import { EntityManager } from "../EntityManager";
import { AfterEvents } from "../../event/Events";

import { ItemStack, Player, system } from "@minecraft/server";

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
            new AfterEvents.ItemStopUseEvent(ev => {
                if (ev.source.name === ownerName) stopFire();
            }),
            new AfterEvents.EntityDie(ev => {
                if (!(ev.deadEntity instanceof Player)) return;
                if (ev.deadEntity.name === ownerName) stopFire();
            })
        ];

        const stopFire = () => {
            TaskManager.removeTask(taskId);
            stopUseItem.unsubscribe();
            playerDie.unsubscribe();
        }
    }

    private static consumeAmmo(entity: Entity) {
        const magazineComp = entity.getComponent('magazine') as MagazineComponent;
        if (magazineComp.ammo === 0) return false;
        magazineComp.ammo--;
        return true;
    }

}