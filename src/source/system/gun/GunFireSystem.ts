import { Entity } from "../../entity/Entity";
import { MagazineComponent } from "../../components/MagazineComponent";
import { TimerComponent } from "../../components/TimerComponent";
import { ItemComponent } from "../../components/ItemComponent";

import { EntityManager } from "../EntityManager";

import { ItemStack } from "@minecraft/server";

export class GunFireSystem {

    static startFire(item: ItemStack) {
        if (item === undefined) return false;

        (function(entity: Entity) {
            const timerTable = entity.components.get('timer') as TimerComponent[];
            const itemComp = entity.components.get('item') as ItemComponent;

            const timerComp = new TimerComponent(3600, 20, () => {
                if (GunFireSystem.consumeAmmo(entity)) return console.warn('shoot!!!');
                console.warn('no enough bullet');
            });
            timerComp.execute();
            itemComp.item.setDynamicProperty('xigmaguns:taskId.fire', timerComp.taskId);

            timerTable.push(timerComp);
        })(EntityManager.getEntity(item));

        return true;
    }
    
    static stopFire(item: ItemStack) {
        if (item === undefined) return false;

        (function(entity: Entity){
            const timerTable = entity.components.get('timer') as TimerComponent[];
            const itemComp = entity.components.get('item') as ItemComponent;

            const taskId = itemComp.item.getDynamicProperty('xigmaguns:taskId.fire') as number;

            const newTable = timerTable.filter(component => {
                if (component.taskId === taskId) {
                    component.kill();
                    return false;
                }
                return true;
            });
            
            entity.components.set('timer', newTable);

        })(EntityManager.getEntity(item));

        return true;
    }

    private static consumeAmmo(entity: Entity) {
        const magazineComp = entity.components.get('magazine') as MagazineComponent;
        if (magazineComp.ammo === 0) return false;
        magazineComp.ammo--;
        return true;
    }

}