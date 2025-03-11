import { EntityManager } from "../system/EntityManager";
import { GunFireSystem } from "../system/combat/GunFireSystem";
import { SmokeGrenade } from "../entity/SmokeGrenade";
import { SmokeGenerator } from "../system/SmokeGenerator";
import { GunReloadSystem } from "../system/combat/GunReloadSystem";
import { DamageSystem } from "../system/combat/DamageSystem";
import { BulletSystem } from "../system/combat/BulletSystem";

import { system, world } from "@minecraft/server";
import { Player } from "@minecraft/server";
import { EquipmentSlot } from "@minecraft/server";

export abstract class PermanentEvents { 

    static register() {
        
        world.afterEvents.itemStartUse.subscribe(ev => {
            if (ev.itemStack.hasTag('xigmaguns:gun')) {
                GunFireSystem.create(ev.source, ev.itemStack);
            }
        });

        world.afterEvents.entitySpawn.subscribe(ev => {
            if (ev.entity.typeId === 'xigmaguns:smoke_grenade') {
                EntityManager.registerEntity(new SmokeGrenade(), ev.entity);
            }
        });

        world.afterEvents.projectileHitEntity.subscribe(ev => {
            const bullet = EntityManager.getEntity(ev.projectile);
            if (bullet === undefined) return;
            
            const target = ev.getEntityHit().entity!;
            if (!(target instanceof Player)) return;
            
            if (bullet.hasComponent('bullet')) {
                const owner = bullet.getComponent('bullet')!.owner!;
                const hitType = BulletSystem.getHitType(ev.location, target);
                new DamageSystem(owner, target).applyGunDamage(bullet, hitType);
            }

            BulletSystem.launchLocus(ev.projectile, ev.location);
        });

        world.afterEvents.playerSpawn.subscribe(ev => {
            if (!ev.initialSpawn) return;
            ev.player.setDynamicProperty('xigmaguns:team', 0);
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