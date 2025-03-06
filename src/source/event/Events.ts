import { EntityDieAfterEvent, EntityDieAfterEventSignal, world } from "@minecraft/server";
import { EventHandler } from "./EventHandler";

import { EntitySpawnAfterEvent, EntitySpawnAfterEventSignal } from "@minecraft/server";
import { ItemStartUseAfterEvent, ItemStartUseAfterEventSignal } from "@minecraft/server";
import { ItemStopUseAfterEvent, ItemStopUseAfterEventSignal } from "@minecraft/server";

export namespace AfterEvents {
    
    export class EntitySpawnEvent extends EventHandler<EntitySpawnAfterEvent, EntitySpawnAfterEventSignal> {
        constructor(func: (event: EntitySpawnAfterEvent) => void) {
            super(world.afterEvents.entitySpawn, func);
        }
    }
    
    export class ItemStartUseEvent extends EventHandler<ItemStartUseAfterEvent, ItemStartUseAfterEventSignal> {
        constructor(func: (event: ItemStartUseAfterEvent) => void) { 
            super(world.afterEvents.itemStartUse, func);
        }
    }
    
    export class ItemStopUseEvent extends EventHandler<ItemStopUseAfterEvent, ItemStopUseAfterEventSignal> {
        constructor(func: (event: ItemStopUseAfterEvent) => void) {
            super(world.afterEvents.itemStopUse, func);
        }
    }

    export class EntityDie extends EventHandler<EntityDieAfterEvent, EntityDieAfterEventSignal> {
        constructor(func: (event: EntityDieAfterEvent) => void) {
            super(world.afterEvents.entityDie, func);
        }
    }

}

import { EntityRemoveBeforeEvent, EntityRemoveBeforeEventSignal } from "@minecraft/server";

export namespace BeforeEvents {

    export class EntityRemoveEvent extends EventHandler<EntityRemoveBeforeEvent, EntityRemoveBeforeEventSignal> {
        constructor(func: (event: EntityRemoveBeforeEvent) => void) {
            super(world.beforeEvents.entityRemove, func);
        }
    }

}