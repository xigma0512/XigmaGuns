import { Player } from "@minecraft/server";
import { PermanentEvents } from "../event/PermanentEvents";
import { CustomEventTrigger } from "../event/custom/CustomEventTrigger";
import { set_entity_property } from "../../utils/Property";

export class InitSystem {
    
    static playerInit(player: Player) {
        set_entity_property(player, 'is_moving', false);
    }

    static worldInit() {
        PermanentEvents.register();
        CustomEventTrigger.triggers();
    }

}