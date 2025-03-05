import { EntityRemoveBeforeEvent, EntityRemoveBeforeEventSignal, system } from "@minecraft/server";

import { world } from "@minecraft/server";
import { BaseEventHandler } from "../BaseEventHandler";

import { SmokeGenerator } from "../../system/SmokeGenerator";
import { EntityManager } from "../../system/EntityManager";

export class EntityRemove extends BaseEventHandler<EntityRemoveBeforeEvent, EntityRemoveBeforeEventSignal> implements EventHandler {

    constructor() {
        super(world.beforeEvents.entityRemove);
    }

    subscribe() {
        this._callback = this._SIGNAL.subscribe(event => {
            const removedEntity = event.removedEntity;

            const entity = EntityManager.getEntity(removedEntity);
            if (entity === undefined) return;

            if (entity.hasComponent('particle')) {
                SmokeGenerator.create(removedEntity.dimension, removedEntity.location, entity);
            }

            EntityManager.unRegisterEntity(entity.uuid);
        });
    }

}