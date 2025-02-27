import { ItemStartUseAfterEvent, ItemStartUseAfterEventSignal } from "@minecraft/server";

import { BaseEventHandler } from "../BaseEventHandler";
import { GunFireSystem } from "../../system/gun/GunFireSystem";

import { world } from "@minecraft/server";

export class ItemStartUse extends BaseEventHandler<ItemStartUseAfterEvent, ItemStartUseAfterEventSignal> implements EventHandler {

    constructor() {
        super(world.afterEvents.itemStartUse);
    }

    subscribe() {
        this._callback = this._SIGNAL.subscribe(event => {
            if (event.itemStack.hasTag('xigmaguns:gun')) {
                GunFireSystem.startFire(event.itemStack);
            }
        });
    }

}