import { RayVector, Vector } from "../../../../utils/Vector";
import { IntervalTask, TaskManager } from "../../TaskManager";
import { world, system } from "@minecraft/server";
export class GrenadeHandler {
    variant;
    _projectile;
    get projectile() { return this._projectile; }
    set projectile(value) {
        this._projectile.remove();
        this._projectile = value;
    }
    constructor(projectile) {
        this.variant = projectile.getComponent('mark_variant').value;
        this._projectile = projectile;
        projectile.triggerEvent('throwing');
    }
    execute() {
        this.projectile.triggerEvent('execute');
        system.run(() => this.projectile.triggerEvent('despawn'));
    }
}
export class SmokeGrenadeHandler extends GrenadeHandler {
    delay;
    constructor(projectile) {
        super(projectile);
        this.delay = (this.variant === 0 ? 70 : 40);
    }
    execute() {
        const dimension = this.projectile.dimension;
        const location = this.projectile.location;
        TaskManager.executeTask(new IntervalTask({
            duration: 300,
            tickFunction() {
                try {
                    for (let i = 0; i < 2; i++)
                        dimension.spawnParticle('minecraft:huge_explosion_emitter', location);
                }
                catch { }
            }
        }));
        super.execute();
    }
}
export class FlashbangHandler extends GrenadeHandler {
    BlindLevels = [
        { min: 0, max: 50, duration: 1.8, fadeOut: 4.5 },
        { min: 50, max: 75, duration: 1, fadeOut: 3.7 },
        { min: 75, max: 135, duration: 0.75, fadeOut: 2.5 },
    ];
    delay;
    constructor(projectile) {
        super(projectile);
        this.delay = (this.variant === 0 ? 40 : 20);
    }
    execute() {
        for (const player of world.getAllPlayers()) {
            const obstacle = this.detectObstacle(player);
            if (obstacle === undefined || obstacle?.block.typeId === null) {
                const level = this.getBlindLevel(player);
                this.applyBlindEffect(player, level.duration, level.fadeOut);
            }
        }
        super.execute();
    }
    detectObstacle(player) {
        const dimension = player.dimension;
        const location = this.projectile.location;
        const headLocation = player.getHeadLocation();
        const connect = new RayVector(headLocation, location);
        const raycast = dimension.getBlockFromRay(headLocation, connect.unit, { maxDistance: connect.length });
        return raycast;
    }
    getBlindLevel(player) {
        const location = Vector.flatten2d(this.projectile.location);
        const headLocation = Vector.flatten2d(player.getHeadLocation());
        const viewDirection = Vector.flatten2d(player.getViewDirection());
        const connect = new RayVector(headLocation, location);
        const view = new RayVector({ x: 0, y: 0, z: 0 }, viewDirection);
        const dot = Vector.dot(view, connect);
        const rad = Math.acos(dot / (view.length * connect.length));
        const deg = rad * (180 / Math.PI);
        for (const level of this.BlindLevels) {
            if (deg >= level.min && deg <= level.max)
                return { duration: level.duration, fadeOut: level.fadeOut };
        }
        return { duration: 0.1, fadeOut: 1 };
    }
    applyBlindEffect(player, duration, fadeOut) {
        player.camera.fade({
            fadeColor: {
                red: 1,
                green: 0.95,
                blue: 0.95
            },
            fadeTime: {
                fadeInTime: 0.1,
                holdTime: duration,
                fadeOutTime: fadeOut
            }
        });
    }
}
//# sourceMappingURL=GrenadeHandlers.js.map