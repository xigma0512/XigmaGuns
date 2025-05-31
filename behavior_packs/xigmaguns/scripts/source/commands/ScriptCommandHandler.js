import { Player } from "@minecraft/server";
import { Utils } from "../../utils/Utils";
import { GunSystemManager } from "../system/combat/gun/GunSystemManager";
import { set_entity_property } from "../../utils/Property";
const Scripts = {
    reload: function (player) {
        const entity = Utils.getHandEquippedItemElement(player);
        if (entity === undefined)
            return;
        GunSystemManager.instance.get(entity.uuid).reload.reload(player);
    },
    moving: (player) => set_entity_property(player, 'is_moving', true),
    stop_moving: (player) => set_entity_property(player, 'is_moving', false)
};
export class ScriptCommandHandler {
    static execute(event) {
        if (event.sourceEntity === undefined)
            return;
        if (!(event.sourceEntity instanceof Player))
            return;
        if (!event.id.startsWith('xg:'))
            return;
        const scriptName = event.id.replace('xg:', '');
        const script = Scripts[scriptName];
        if (script)
            script(event.sourceEntity);
    }
}
//# sourceMappingURL=ScriptCommandHandler.js.map