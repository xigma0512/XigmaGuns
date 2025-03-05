import { ItemStopUseAfterEvent, ItemStopUseAfterEventSignal } from "@minecraft/server";

import { BaseEventHandler } from "../BaseEventHandler";
import { GunFireSystem } from "../../system/gun/GunFireSystem";

import { world, ItemStack } from "@minecraft/server";

export class ItemStopUse extends BaseEventHandler<ItemStopUseAfterEvent, ItemStopUseAfterEventSignal> implements EventHandler {

    constructor() {
        super(world.afterEvents.itemStopUse);
    }

    subscribe() {
        this._callback = this._SIGNAL.subscribe(event => {
            if (event.itemStack?.hasTag('xigmaguns:gun')) {
                GunFireSystem.stopFire(event.itemStack as ItemStack, event.source);
            }
        });
    }

}