import { EntityManager } from "../system/EntityManager";
import { GunFireSystem } from "../system/combat/GunFireSystem";
import { SmokeGrenade } from "../entity/SmokeGrenade";
import { SmokeGenerator } from "../system/SmokeGenerator";
import { GunReloadSystem } from "../system/combat/GunReloadSystem";

import { system, world } from "@minecraft/server";
import { Player } from "@minecraft/server";
import { EquipmentSlot } from "@minecraft/server";

export abstract class PermanentEvents { 

    static register() {
        
        world.afterEvents.itemStartUse.subscribe(ev => {
            if (ev.itemStack.hasTag('xigmaguns:gun')) {
                GunFireSystem.startFire(ev.itemStack, ev.source);
            }
        });

        world.afterEvents.entitySpawn.subscribe(ev => {
            if (ev.entity.typeId === 'xigmaguns:smoke_grenade') {
                EntityManager.registerEntity(new SmokeGrenade(), ev.entity);
            }
        });

        system.afterEvents.scriptEventReceive.subscribe(ev => {
            const player = ev.sourceEntity as Player;
            if (ev.id === 'xigmaguns:reload') {
                const item = player.getComponent('equippable')?.getEquipmentSlot(EquipmentSlot.Mainhand).getItem();
                if (item === undefined) return;
                GunReloadSystem.create(player, item);
            } 
        });

        world.beforeEvents.entityRemove.subscribe(ev => {
            const entity = EntityManager.getEntity(ev.removedEntity);
            if (entity === undefined) return;

            if (ev.removedEntity.typeId === 'xigmaguns:smoke_grenade') {
                SmokeGenerator.create(ev.removedEntity.dimension, ev.removedEntity.location, entity);
            }

            EntityManager.unRegisterEntity(entity.uuid);
        });

    }

}