import { Player } from "@minecraft/server";
import { ScriptEventCommandMessageAfterEvent } from "@minecraft/server";
import { Utils } from "../../utils/Utils";
import { GunSystemManager } from "../system/combat/gun/GunSystemManager";

const Scripts = {
    reload: function (player: Player) {
        const entity = Utils.getHandEquippedItemElement(player);
        if (entity === undefined) return;
        GunSystemManager.instance.get(entity.uuid)!.reload.reload(player);
    },
    moving: (player: Player) => player.setDynamicProperty('xigmaguns:is_moving', true),
    stop_moving: (player: Player) => player.setDynamicProperty('xigmaguns:is_moving', false)
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