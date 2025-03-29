import { GunFireProcess } from "../system/combat/gun/GunFireProcess";
import { InitSystem } from "../system/InitSystem";
import { ScriptCommandHandler } from "../commands/ScriptCommandHandler";

import { Utils } from "../../utils/Utils";

import { system, world } from "@minecraft/server";
import { Grenade } from "../system/combat/equipment/Grenades";

export abstract class PermanentEvents { 

    static register() {
        
        world.afterEvents.itemStartUse.subscribe(ev => {
            if (ev.itemStack.hasTag('xigmaguns:gun')) {
                new GunFireProcess(ev.source, Utils.getHandEquippedItemEntity(ev.source)!).execute();
            }
            if (ev.itemStack.hasTag('xigmaguns:grenade')) Grenade.throwing(ev.source, ev.itemStack);
        });

        world.afterEvents.entitySpawn.subscribe(ev => {
            const family = ev.entity.getComponent('type_family');
            if (family === undefined) return;

            if (family.hasTypeFamily('grenade') && !ev.entity.hasTag('rebound')) return new Grenade(ev.entity);
        });

        world.afterEvents.playerSpawn.subscribe(ev => {
            if (ev.initialSpawn) InitSystem.playerInit(ev.player);
        });

        system.afterEvents.scriptEventReceive.subscribe(ev => {
            ScriptCommandHandler.execute(ev);
        });

    }

}