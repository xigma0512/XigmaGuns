import { Player } from "@minecraft/server";
import { Utils } from "../../../utils/Utils";
import { entity_property } from "../../../utils/Property";

export class PlayerOffsetSystem {

    static getOffset(owner: Player) {
        const handWeapon = Utils.getHandEquippedItemElement(owner);
        if (handWeapon === undefined) return 0;
        
        const offsetComponent = handWeapon.getComponent('offset');
        if (offsetComponent === undefined) return 0;

        if (owner.isSneaking) return offsetComponent.scope;
        if (entity_property(owner, 'is_moving')) return offsetComponent.hippie + offsetComponent.movement;
        return offsetComponent.hippie;
    }

}