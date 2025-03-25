import { SmokeGrenade } from "../../../entity/SmokeGrenade";
import { EntityManager } from "../../EntityManager";
import { IntervalTask, TaskManager } from "../../TaskManager";

import { system, world } from "@minecraft/server";
import { Entity as mcEntity } from "@minecraft/server";

abstract class IGrenadeHandler {
    constructor(projectile: mcEntity) { }
}

class SmokeGrenadeHandler {
    
    readonly projectile: mcEntity;
    readonly grenade: SmokeGrenade;

    constructor(projectile: mcEntity) {
        this.projectile = projectile;
        this.grenade = new SmokeGrenade();
        EntityManager.registerEntity(this.grenade, this.projectile);
        this.listener();
    }

    private listener() {
        const entityRemove = world.beforeEvents.entityRemove.subscribe(ev => {
            if (ev.removedEntity.id !== this.projectile.id) return;
            const dimension = ev.removedEntity.dimension;
            const location = ev.removedEntity.location;
            TaskManager.executeTask(new IntervalTask({
                duration: 300,
                tickFunction() {
                    try { for (let i = 0; i < 2; i++) dimension.spawnParticle('minecraft:huge_explosion_emitter', location);
                    } catch { }
                }
            }));
            system.run(() => despawn());
        });

        const despawn = () => {
            EntityManager.unRegisterEntity(this.grenade.uuid);
            world.beforeEvents.entityRemove.unsubscribe(entityRemove);
        }
    }

}

export class GrenadeSystem {

    readonly projectile: mcEntity;
    readonly handler: IGrenadeHandler;
    
    constructor(projectile: mcEntity) {
        this.projectile = projectile;
        this.handler = this.getHandlerType();
    }

    private getHandlerType() {
        const family = this.projectile.getComponent('type_family')!;
        if (family.hasTypeFamily('smoke_grenade')) return new SmokeGrenadeHandler(this.projectile);
        throw "[ERROR] 無法找到對應的 Grenade 類別";
    }

}