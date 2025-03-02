import { Entity } from "../../entity/Entity";
import { MagazineComponent } from "../../components/MagazineComponent";
import { TimerComponent } from "../../components/TimerComponent";
import { ItemComponent } from "../../components/ItemComponent";

import { EntityManager } from "../EntityManager";

import { ItemStack } from "@minecraft/server";

export class GunFireSystem {

    static startFire(item: ItemStack) {
        if (item === undefined) return false;

        const entity = EntityManager.getEntity(item) as Entity;
        if (entity === undefined) return false;

        const timerTable = entity.getComponent('timer') as TimerComponent[];
        const itemComp = entity.getComponent('item') as ItemComponent;
        const timerComp = new TimerComponent({
            duration: 3600,
            interval: 20,
            tickFunction() {
                if (GunFireSystem.consumeAmmo(entity)) return console.warn('shoot!!!');
                console.warn('no enough bullet');
            }
        });
        itemComp.item.setDynamicProperty('xigmaguns:taskId.fire', timerComp.execute());
        timerTable.push(timerComp);

        return true;
    }
    
    static stopFire(item: ItemStack) {
        if (item === undefined) return false;

        const entity = EntityManager.getEntity(item) as Entity;
        if (entity === undefined) return false;

        const timerTable = entity.getComponent('timer') as TimerComponent[];
        const itemComp = entity.getComponent('item') as ItemComponent;

        const taskId = itemComp.item.getDynamicProperty('xigmaguns:taskId.fire') as number;
        entity.setComponent('timer', timerTable.filter(comp => {
            if (comp.taskId !== taskId) return true;
            comp.kill();
            return false;
        }));
        
        return true;
    }

    private static consumeAmmo(entity: Entity) {
        const magazineComp = entity.getComponent('magazine') as MagazineComponent;
        if (magazineComp.ammo === 0) return false;
        magazineComp.ammo--;
        return true;
    }

}