import { EquipmentSlot } from "@minecraft/server";
import { GunReloadProcess } from "../system/combat/gun/GunReloadProcess";

import { Player } from "@minecraft/server";
import { ScriptEventCommandMessageAfterEvent } from "@minecraft/server";

const Scripts = {
    reload: function (player: Player) {
        const item = player.getComponent('equippable')?.getEquipmentSlot(EquipmentSlot.Mainhand).getItem();
        if (item === undefined) return;
        new GunReloadProcess(player, item).execute();
    }
}

export class ScriptCommandHandler {

    static execute(event: ScriptEventCommandMessageAfterEvent) {
        if (event.sourceEntity === undefined) return;
        if (!(event.sourceEntity instanceof Player)) return;
        if (!event.id.startsWith('xigmaguns:')) return;

        const scriptName = event.id.replace('xigmaguns:', '') as keyof typeof Scripts;
        const script = Scripts[scriptName];
        if (script) script(event.sourceEntity);
    }

}