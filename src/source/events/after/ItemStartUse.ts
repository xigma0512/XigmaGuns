import { ItemStartUseAfterEvent, ItemStartUseAfterEventSignal } from "@minecraft/server";

import { world } from "@minecraft/server";
import { BaseEventHandler } from "../BaseEventHandler";

import { GunActionSystem } from "../../system/equipment/GunActionSystem";

export class ItemStartUse extends BaseEventHandler<ItemStartUseAfterEvent, ItemStartUseAfterEventSignal> implements EventHandler {

    constructor() {
        super(world.afterEvents.itemStartUse);
    }

    subscribe() {
        this._callback = this._SIGNAL.subscribe(event => {
            if (event.itemStack.hasTag('xigmaguns:gun')) {
                GunActionSystem.startFire(event.itemStack);
            }
        });
    }

}