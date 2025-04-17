import { Player, world } from "@minecraft/server";
import { Entity } from "../../../entity/Entity";
import { GunSystemManager } from "./GunSystemManager";
import { IntervalTask, TaskManager } from "../../TaskManager";
import { customEvents } from "../../../event/custom/CustomEventManager";

export class GunReloadSystem {
    
    readonly gun: Entity;

    constructor(gun: Entity) {
        this.gun = gun;
    }

    reload(owner: Player) {
        if (owner.hasTag('xigmaguns:reloading')) return;
        
        const gunComponent = this.gun.getComponent('gun')!;
        const magazineSystem = GunSystemManager.instance.get(this.gun.uuid)!.magazine;
        if (magazineSystem.ammo === magazineSystem.capacity) return;
        if (magazineSystem.storageAmmo === 0) return;

        const taskId = TaskManager.executeTask(new IntervalTask({
            duration: gunComponent.reload_time,
            interval: 1,
            tickFunction: (tick: number) => {
                if (tick === gunComponent.reload_time) return completion();
                owner.onScreenDisplay.setActionBar(`${tick}`);
            }
        }));
        watchInterruptions();

        function watchInterruptions() {
            const changeHotbar = customEvents.playerChangeHotbar.subscribe(ev => {
                if (ev.player.id === owner.id) {
                    interruption();
                    customEvents.playerChangeHotbar.unsubscribe(changeHotbar);
                }
            });

            const playerDie = world.afterEvents.entityDie.subscribe(ev => {
                if (ev.deadEntity.id === owner.id) {
                    interruption();
                    world.afterEvents.entityDie.unsubscribe(playerDie);
                }
            });
        }

        function interruption() {
            TaskManager.removeTask(taskId);    
        }

        function completion() {
            interruption();
            magazineSystem.reloaded();
            owner.sendMessage('CompleteReload.');
        }

    }

}