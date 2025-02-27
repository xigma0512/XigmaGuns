import { ItemComponent } from "../../components/ItemComponent";
import { TimerComponent } from "../../components/TimerComponent";

import { EntityManager } from "../EntityManager";
import { IGunEntity } from "../../entity/Glock17";

import { ItemStack } from "@minecraft/server";

export class GunActionSystem {

    static startFire(item: ItemStack) {
        if (item === undefined) return false;

        const uuid = item.getDynamicProperty('xigmaguns:uuid') as string;
        if (uuid === undefined) return false;

        const gunEntity = EntityManager.getEntities().get(uuid) as IGunEntity;
        if (gunEntity === undefined) return false;

        (function(gunEntity: IGunEntity) {
            const timerTable = gunEntity.components.get('xigmaguns:timer') as TimerComponent[];
            const itemComp = gunEntity.components.get('xigmaguns:item') as ItemComponent;

            const timerComp = new TimerComponent(3600, 20, () => {
                if (gunEntity.fire()) return console.warn('shoot!!!');
                console.warn('no enough bullet');
            });
            timerComp.execute();
            itemComp.item.setDynamicProperty('xigmaguns:taskId.fire', timerComp.taskId);

            timerTable.push(timerComp);
        })(gunEntity);

        return true;
    }
    
    static stopFire(item: ItemStack) {
        if (item === undefined) return false;

        const uuid = item.getDynamicProperty('xigmaguns:uuid') as string;
        if (uuid === undefined) return false;

        const gunEntity = EntityManager.getEntities().get(uuid) as IGunEntity;
        if (gunEntity === undefined) return false;

        (function(gunEntity: IGunEntity){
            const timerTable = gunEntity.components.get('xigmaguns:timer') as TimerComponent[];
            const itemComp = gunEntity.components.get('xigmaguns:item') as ItemComponent;

            const taskId = itemComp.item.getDynamicProperty('xigmaguns:taskId.fire') as number;

            timerTable.filter(component => {
                if (component.taskId === taskId) {
                    component.kill();
                    return false;
                }
                return true;
            });
        })(gunEntity);

        return true;
    }

    static reload(gunEntity: IGunEntity) {
        return gunEntity.reload();
    }

}