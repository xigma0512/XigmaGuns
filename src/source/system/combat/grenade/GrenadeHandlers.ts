import { IntervalTask, TaskManager } from "../../TaskManager";

import { Entity as mcEntity, world } from "@minecraft/server";

export class GrenadeHandler {

    readonly variant: number;
    readonly executeDelay: number;
    private _projectile: mcEntity;

    get projectile() { return this._projectile; }
    set projectile(value: mcEntity) {
        this._projectile.remove();
        this._projectile = value;
    }

    constructor(projectile: mcEntity) {
        this.variant = projectile.getComponent('mark_variant')!.value;
        this.executeDelay = (this.variant === 0 ? 70 : 40);
        this._projectile = projectile;

        projectile.triggerEvent('throwing');
    }

    execute() {
        this.projectile.triggerEvent('execute');
    }

}

export class SmokeGrenadeHandler extends GrenadeHandler {
    
    constructor(projectile: mcEntity) {
        super(projectile);
    }

    execute() {
        const dimension = this.projectile.dimension;
        const location = this.projectile.location;
        
        TaskManager.executeTask(new IntervalTask({
            duration: 300,
            tickFunction() {
                try { 
                    for (let i = 0; i < 2; i++) dimension.spawnParticle('minecraft:huge_explosion_emitter', location);
                } catch { }
            }
        }));
        super.execute();
    }

}

export class FlashbangHandler extends GrenadeHandler {

    constructor(projectile: mcEntity) {
        super(projectile);
    }

    execute() {
        for (const player of world.getAllPlayers()) {
            console.log('flash!');
        }
        super.execute();
    }

}