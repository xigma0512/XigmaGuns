import { system } from "@minecraft/server";
import { Dimension } from "@minecraft/server";
import { Vector3 } from "@minecraft/server";

export class SmokeBomb {

    constructor(
        private _dimension: Dimension, 
        private _location: Vector3,
        private _timer: number
    ) { }

    private run(taskId: number) {
        if (--this._timer <= 0) system.clearRun(taskId); 
        for (let i=0; i<2; i++) 
            try { this._dimension.spawnParticle('minecraft:huge_explosion_emitter', this._location); } 
            catch { }
    }

    static create(dimension: Dimension, location: Vector3, timer: number) {
        const instance = new this(dimension, location, timer);
        const taskId = system.runInterval(() => instance.run(taskId), 1);
    }

}