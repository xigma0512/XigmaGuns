import { Entity } from "../entity/Entity";
import { ParticleComponent } from "../components/ParticleComponent";

import { Dimension } from "@minecraft/server";
import { Vector3 } from "@minecraft/server";
import { TimerComponent } from "../components/TimerComponent";

export class SmokeGenerator {

    static create(dimension: Dimension, location: Vector3, entity: Entity) {
        const timerTable = entity.getComponent('timer') as TimerComponent[];
        const particleComp = entity.getComponent('particle') as ParticleComponent;
        
        const timerComp = new TimerComponent({
            duration: particleComp.duration,
            interval: particleComp.interval,
            tickFunction() {
                for (let i = 0; i < 2; i++) {
                    try { dimension.spawnParticle(particleComp.typeId, location); } catch { }
                }
            }
        });

        timerComp.execute();
        timerTable.push(timerComp);
    }

}