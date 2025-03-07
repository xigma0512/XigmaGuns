import { AfterEvents, BeforeEvents } from "./Events";

import { EntityManager } from "../system/EntityManager";
import { GunFireSystem } from "../system/combat/GunFireSystem";
import { SmokeGrenade } from "../entity/SmokeGrenade";
import { SmokeGenerator } from "../system/SmokeGenerator";

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