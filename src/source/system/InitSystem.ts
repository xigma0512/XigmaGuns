import { Player } from "@minecraft/server";
import { PermanentEvents } from "../event/PermanentEvents";
import { CustomEventTrigger } from "../event/custom/CustomEventTrigger";

export class InitSystem {
    
    static playerInit(player: Player) {
        player.setDynamicProperties({
            'xigmaguns:is_moving': false,
            'xigmaguns:offset': 0,
            /* TEST CODE */ 'xigmaguns:team': 0
        });
    }

    static worldInit() {
        PermanentEvents.register();
        CustomEventTrigger.triggers();
    }

}