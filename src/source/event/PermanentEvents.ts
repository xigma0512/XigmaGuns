import { AfterEvents, BeforeEvents } from "./Events";

import { EntityManager } from "../system/EntityManager";
import { GunFireSystem } from "../system/combat/GunFireSystem";
import { SmokeGrenade } from "../entity/SmokeGrenade";
import { SmokeGenerator } from "../system/SmokeGenerator";
import { GunReloadSystem } from "../system/combat/GunReloadSystem";

import { ItemStack, Player } from "@minecraft/server";
import { EquipmentSlot } from "@minecraft/server";

export abstract class PermanentEvents { 

    static register() {
        
        new AfterEvents.ItemStartUse(ev => {
            if (ev.itemStack.hasTag('xigmaguns:gun')) {
                GunFireSystem.startFire(ev.itemStack, ev.source);
            }
        });

        new AfterEvents.EntitySpawn(ev => {
            if (ev.entity.typeId === 'xigmaguns:smoke_grenade') {
                EntityManager.registerEntity(new SmokeGrenade(), ev.entity);
            }
        });

        new AfterEvents.ScriptEventReceive(ev => {
            const player = ev.sourceEntity as Player;
            if (ev.id === 'xigmaguns:reload') {
                const slot = player.getComponent('equippable')?.getEquipmentSlot(EquipmentSlot.Mainhand);
                GunReloadSystem.startReload(slot?.getItem() as ItemStack, player as Player);
            } 
        });

        new BeforeEvents.EntityRemove(ev => {
            const entity = EntityManager.getEntity(ev.removedEntity);
            if (entity === undefined) return;

            if (ev.removedEntity.typeId === 'xigmaguns:smoke_grenade') {
                SmokeGenerator.create(ev.removedEntity.dimension, ev.removedEntity.location, entity);
            }

            EntityManager.unRegisterEntity(entity.uuid);
        });

    }

}