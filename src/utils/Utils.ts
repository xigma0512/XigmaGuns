import { ElementManager } from "../source/system/ElementManager";

import { Player } from "@minecraft/server";
import { EquipmentSlot } from "@minecraft/server";

export class Utils {
    
    static randomUUID() {
        let d = new Date().getTime();
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    static getHandEquippedItemElement(player: Player) {
        const handItem = player.getComponent('equippable')?.getEquipment(EquipmentSlot.Mainhand); 
        if (handItem === undefined) return;
        return ElementManager.getElement(handItem);
    }

}