import { InitSystem } from "../system/InitSystem";
import { ScriptCommandHandler } from "../commands/ScriptCommandHandler";

import { system, world } from "@minecraft/server";
import { Grenade } from "../system/combat/grenade/Grenade";

import { GunSystemManager } from "../system/combat/gun/GunSystemManager";
import { EntityManager } from "../system/EntityManager";

export abstract class PermanentEvents { 

    static register() {
        
        world.afterEvents.itemStartUse.subscribe(ev => {
            if (ev.itemStack.hasTag('xigmaguns:gun')) {
                const gunEntity = EntityManager.getEntity(ev.itemStack);
                if (gunEntity === undefined) return;

                GunSystemManager.instance.get(gunEntity.uuid)!.fire.fire(ev.source);
            }
        });

        world.beforeEvents.itemUse.subscribe(ev => {
            if (ev.itemStack.hasTag('xigmaguns:grenade')) {
                ev.cancel = true;
                system.run(() => Grenade.throwing(ev.source, ev.itemStack));
            }
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