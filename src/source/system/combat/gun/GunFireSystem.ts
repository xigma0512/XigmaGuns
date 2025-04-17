import { Player, world } from "@minecraft/server";
import { Entity } from "../../../entity/Entity";

import { GunSystemManager } from "./GunSystemManager";
import { BulletHandler } from "../BulletHandler";
import { IntervalTask, TaskManager } from "../../TaskManager";
import { PlayerOffsetSystem } from "../PlayerOffsetSystem";

export class GunFireSystem {
    
    readonly gun: Entity;

    constructor(gun: Entity) {
        this.gun = gun;
    }

    fire(owner: Player) {
        const gunComponent = this.gun.getComponent('gun')!;
        const magazineSystem = GunSystemManager.instance.get(this.gun.uuid)!.magazine;

        
        const taskId = TaskManager.executeTask(new IntervalTask({
            interval: gunComponent.fireRate,
            tickFunction: () => {
                if (magazineSystem.fireCheck()) {
                    const playerOffset = PlayerOffsetSystem.getOffset(owner);
                    new BulletHandler(owner, this.gun, playerOffset);
                    return;
                }
            }
        }));
        watchInterruptions();
        
        function watchInterruptions() {
            const itemStopUse = world.afterEvents.itemStopUse.subscribe(ev => {
                if (ev.source.id === owner.id) {
                    world.afterEvents.itemStopUse.unsubscribe(itemStopUse);
                    interruption();
                }
            });
        
            const playerDie = world.afterEvents.entityDie.subscribe(ev => {
                if (ev.deadEntity.id === owner.id) {
                    world.afterEvents.entityDie.unsubscribe(playerDie);
                    interruption();
                }
            });
        }

        function interruption() {
            TaskManager.removeTask(taskId);
        }

    }

}