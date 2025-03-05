import { EntitySpawnAfterEvent, EntitySpawnAfterEventSignal } from "@minecraft/server";

import { world } from "@minecraft/server";
import { BaseEventHandler } from "../BaseEventHandler";

import { EntityManager } from "../../system/EntityManager";
import { SmokeGrenade } from "../../entity/SmokeGrenade";

export class EntitySpawn extends BaseEventHandler<EntitySpawnAfterEvent, EntitySpawnAfterEventSignal> implements EventHandler {

    constructor() {
        super(world.afterEvents.entitySpawn);
    }

    subscribe() {
        this._callback = this._SIGNAL.subscribe(event => {
            const entity = event.entity;
            if (entity.typeId === 'xigmaguns:smoke_grenade') {
                EntityManager.registerEntity(new SmokeGrenade());
            }
        });
    }

}