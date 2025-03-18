import { GunReloadProcess } from "../system/combat/gun/GunReloadProcess";

import { Player } from "@minecraft/server";
import { ScriptEventCommandMessageAfterEvent } from "@minecraft/server";
import { Utils } from "../../utils/Utils";

const Scripts = {
    reload: function (player: Player) {
        const entity = Utils.getHandEquippedItemEntity(player);
        new GunReloadProcess(player, entity!).execute();
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