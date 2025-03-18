import { Player } from "@minecraft/server";

export class InitSystem {
    static init(player: Player) {
        player.setDynamicProperties({
            'xigmaguns:is_moving': false,
            'xigmaguns:offset': 0,
            /* TEST CODE */ 'xigmaguns:team': 0
        });
    }
}