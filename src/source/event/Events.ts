import { system, world } from "@minecraft/server";

import { EventHandler } from "./EventHandler";
import { customEvents } from "./custom/CustomEventManager";

import { EntitySpawnAfterEvent, EntitySpawnAfterEventSignal } from "@minecraft/server";
import { EntityDieAfterEvent, EntityDieAfterEventSignal } from "@minecraft/server";
import { ItemStartUseAfterEvent, ItemStartUseAfterEventSignal } from "@minecraft/server";
import { ItemStopUseAfterEvent, ItemStopUseAfterEventSignal } from "@minecraft/server";
import { ScriptEventCommandMessageAfterEvent, ScriptEventCommandMessageAfterEventSignal } from "@minecraft/server";
import { EntityRemoveBeforeEvent, EntityRemoveBeforeEventSignal } from "@minecraft/server";

import { PlayerChangeHotbarEvent, PlayerChangeHotbarEventSignal } from "./custom/PlayerChangeHotbar";

export namespace AfterEvents {
    
    export class EntitySpawn extends EventHandler<EntitySpawnAfterEvent, EntitySpawnAfterEventSignal> {
        constructor(func: (event: EntitySpawnAfterEvent) => void) {
            super(world.afterEvents.entitySpawn, func);
        }
    }
    
    export class EntityDie extends EventHandler<EntityDieAfterEvent, EntityDieAfterEventSignal> {
        constructor(func: (event: EntityDieAfterEvent) => void) {
            super(world.afterEvents.entityDie, func);
        }
    }

    export class ItemStartUse extends EventHandler<ItemStartUseAfterEvent, ItemStartUseAfterEventSignal> {
        constructor(func: (event: ItemStartUseAfterEvent) => void) { 
            super(world.afterEvents.itemStartUse, func);
        }
    }
    
    export class ItemStopUse extends EventHandler<ItemStopUseAfterEvent, ItemStopUseAfterEventSignal> {
        constructor(func: (event: ItemStopUseAfterEvent) => void) {
            super(world.afterEvents.itemStopUse, func);
        }
    }

    export class ScriptEventReceive extends EventHandler<ScriptEventCommandMessageAfterEvent, ScriptEventCommandMessageAfterEventSignal> {
        constructor(func: (event: ScriptEventCommandMessageAfterEvent) => void) {
            super(system.afterEvents.scriptEventReceive, func);
        }
    }
}

export namespace BeforeEvents {

    export class EntityRemove extends EventHandler<EntityRemoveBeforeEvent, EntityRemoveBeforeEventSignal> {
        constructor(func: (event: EntityRemoveBeforeEvent) => void) {
            super(world.beforeEvents.entityRemove, func);
        }
    }

}

export namespace CustomEvents {

    export class PlayerChangeHotbar extends EventHandler<PlayerChangeHotbarEvent, PlayerChangeHotbarEventSignal> {
        constructor(func: (event: PlayerChangeHotbarEvent) => void) {
            super(customEvents.playerChangeHotbar, func);
        }
    }

}