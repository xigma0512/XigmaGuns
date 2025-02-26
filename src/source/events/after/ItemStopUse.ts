import { ItemStopUseAfterEvent, ItemStopUseAfterEventSignal } from "@minecraft/server";

import { world, ItemStack } from "@minecraft/server";
import { BaseEventHandler } from "../BaseEventHandler";

import { GunActionSystem } from "../../system/equipment/GunActionSystem";

export class ItemStopUse extends BaseEventHandler<ItemStopUseAfterEvent, ItemStopUseAfterEventSignal> implements EventHandler {

    constructor() {
        super(world.afterEvents.itemStopUse);
    }

    subscribe() {
        this._callback = this._SIGNAL.subscribe(event => {
            if (event.itemStack?.hasTag('xigmaguns:gun')) {
                GunActionSystem.stopFire(event.itemStack as ItemStack);
            }
        });
    }

}