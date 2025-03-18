import { IntervalTask, TaskManager } from "../../TaskManager";
import { Entity } from "@minecraft/server";
import { EntityManager } from "../../EntityManager";

export class SmokeGenerator {

    static create(entity: Entity) {

        if (entity.typeId !== 'xigmaguns:smoke_grenade') return;

        const grenade = EntityManager.getEntity(entity);
        if (grenade === undefined) return;

        const particleComp = grenade.getComponent('particle')!;

        TaskManager.executeTask(new IntervalTask({
            duration: particleComp.duration,
            interval: particleComp.interval,
            tickFunction() {
                for (let i = 0; i < 2; i++) {
                    try { entity.dimension.spawnParticle(particleComp.typeId, entity.location); } catch { }
                }
            }
        }));

        EntityManager.unRegisterEntity(grenade.uuid);
    }

}