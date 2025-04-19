import { Player } from "@minecraft/server";
import { Utils } from "../../../utils/Utils";

export class PlayerOffsetSystem {

    static getOffset(owner: Player) {
        const handWeapon = Utils.getHandEquippedItemEntity(owner);
        if (handWeapon === undefined) return 0;
        
        const offsetComponent = handWeapon.getComponent('offset');
        if (offsetComponent === undefined) return 0;

        if (owner.isSneaking) return offsetComponent.scope;
        if (owner.getDynamicProperty('xigmaguns:is_moving')) return offsetComponent.hippie + offsetComponent.movement;
        return offsetComponent.hippie;
    }

}