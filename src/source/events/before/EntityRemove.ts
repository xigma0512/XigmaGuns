import { EntityRemoveBeforeEvent, EntityRemoveBeforeEventSignal } from "@minecraft/server";

import { world } from "@minecraft/server";
import { BaseEventHandler } from "../BaseEventHandler";

import { SmokeBomb } from "../../entity/equipment/throwable/SmokeBomb";

export class EntityRemove extends BaseEventHandler<EntityRemoveBeforeEvent, EntityRemoveBeforeEventSignal> implements EventHandler {

    constructor() {
        super(world.beforeEvents.entityRemove);
    }

    subscribe() {
        this._callback = this._SIGNAL.subscribe(event => {
            const entity = event.removedEntity;
            if (entity.typeId === 'xigmaguns:smoke_grenade') {
                SmokeBomb.create(entity.dimension, entity.location, 300);
            }
        });
    }

}