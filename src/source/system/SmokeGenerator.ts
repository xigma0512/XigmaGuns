import { Entity } from "../entity/Entity";
import { ParticleComponent } from "../components/ParticleComponent";

import { Dimension } from "@minecraft/server";
import { Vector3 } from "@minecraft/server";
import { IntervalTask, TaskManager } from "./timer/TaskManager";

export class SmokeGenerator {

    static create(dimension: Dimension, location: Vector3, entity: Entity) {
        const particleComp = entity.getComponent('particle') as ParticleComponent;
        
        TaskManager.executeTask(new IntervalTask({
            duration: particleComp.duration,
            interval: particleComp.interval,
            tickFunction() {
                for (let i = 0; i < 2; i++) {
                    try { dimension.spawnParticle(particleComp.typeId, location); } catch { }
                }
            }
        }));
    }

}