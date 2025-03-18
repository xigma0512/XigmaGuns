import { EntityManager } from "../system/EntityManager";
import { SmokeGrenade } from "../entity/SmokeGrenade";

import { SmokeGenerator } from "../system/combat/equipment/SmokeGenerator";
import { GunFireProcess } from "../system/combat/gun/GunFireProcess";
import { ScriptCommandHandler } from "../commands/ScriptCommandHandler";
import { InitSystem } from "../system/InitSystem";

import { system, world } from "@minecraft/server";
import { Utils } from "../../utils/Utils";

export abstract class PermanentEvents { 

    static register() {
        
        world.afterEvents.itemStartUse.subscribe(ev => {
            if (ev.itemStack.hasTag('xigmaguns:gun')) {
                new GunFireProcess(ev.source, Utils.getHandEquippedItemEntity(ev.source)!).execute();
            }
        });

        world.afterEvents.entitySpawn.subscribe(ev => {
            if (ev.entity.typeId === 'xigmaguns:smoke_grenade') {
                EntityManager.registerEntity(new SmokeGrenade(), ev.entity);
            }
        });

        world.afterEvents.playerSpawn.subscribe(ev => {
            if (ev.initialSpawn) {
                InitSystem.init(ev.player);
            }
        });

        system.afterEvents.scriptEventReceive.subscribe(ev => {
            ScriptCommandHandler.execute(ev);
        });

        world.beforeEvents.entityRemove.subscribe(ev => {
            SmokeGenerator.create(ev.removedEntity);
        });

    }

}