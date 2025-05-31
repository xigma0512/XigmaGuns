import { world } from "@minecraft/server";
import { GunSystemManager } from "./GunSystemManager";
import { IntervalTask, TaskManager } from "../../TaskManager";
import { customEvents } from "../../../event/custom/CustomEventManager";
export class GunReloadSystem {
    gun;
    _reloading = false;
    constructor(gun) {
        this.gun = gun;
    }
    reload(owner) {
        const gunComponent = this.gun.getComponent('gun');
        const magazineSystem = GunSystemManager.instance.get(this.gun.uuid).magazine;
        if (magazineSystem.ammo === magazineSystem.capacity)
            return;
        if (magazineSystem.storageAmmo === 0)
            return;
        if (this._reloading)
            return;
        this._reloading = true;
        const taskId = TaskManager.executeTask(new IntervalTask({
            duration: gunComponent.reload_time,
            interval: 1,
            tickFunction: (tick) => {
                if (tick === gunComponent.reload_time)
                    return completion();
                owner.onScreenDisplay.setActionBar(`${tick}`);
            }
        }));
        (function () {
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
        })();
        const interruption = () => {
            this._reloading = false;
            TaskManager.removeTask(taskId);
        };
        const completion = () => {
            interruption();
            magazineSystem.reloaded();
            owner.sendMessage('CompleteReload.');
        };
    }
}
//# sourceMappingURL=GunReloadSystem.js.map