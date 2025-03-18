import { Entity } from "../../../entity/Entity";
import { EntityManager } from "../../EntityManager";
import { IntervalTask, TaskManager } from "../../TaskManager";
import { customEvents } from "../../../event/custom/CustomEventManager";

import { PlayerChangeHotbarEvent } from "../../../event/custom/PlayerChangeHotbar";
import { EntityDieAfterEvent } from "@minecraft/server";

import { world } from "@minecraft/server";
import { ItemStack, Player } from "@minecraft/server";

export class GunReloadProcess {

    private readonly _owner: Player;
    private readonly _weaponEntity: Entity;

    private _taskId = -1;

    private _changeHotbarListener?: EventType<PlayerChangeHotbarEvent>;
    private _playerDieListener?: EventType<EntityDieAfterEvent>;

    constructor(owner: Player, weaponEntity: Entity) {
        this._owner = owner;
        this._weaponEntity = weaponEntity;
        if (this._weaponEntity === undefined) throw '[ERROR] 找不到實體資料';
    }

    execute() {
        if (this._owner.hasTag('xigmaguns:reloading')) return;

        const gun = this._weaponEntity.getComponent('gun')!;
        const magazine = this._weaponEntity.getComponent('magazine')!;
        if (magazine.ammo === magazine.capacity) return;
        if (magazine.storageAmmo === 0) return;

        this._owner.addTag('xigmaguns:reloading');

        this._taskId = TaskManager.executeTask(new IntervalTask({
            duration: gun.reload_time,
            interval: 1,
            tickFunction: (tick: number) => {
                if (tick === gun.reload_time) return this.completion();
                this._owner.onScreenDisplay.setActionBar(`${tick}`);
            }
        }));
        this.watchInterruptions();
    }

    private watchInterruptions() {
        this._changeHotbarListener = customEvents.playerChangeHotbar.subscribe(ev => {
            if (ev.player.id === this._owner.id) this.interruption();
        });

        this._playerDieListener = world.afterEvents.entityDie.subscribe(ev => {
            if (ev.deadEntity.id === this._owner.id) this.interruption();
        });
    }

    private interruption() {
        TaskManager.removeTask(this._taskId);
        this._owner.removeTag('xigmaguns:reloading');

        customEvents.playerChangeHotbar.unsubscribe(this._changeHotbarListener!);
        world.afterEvents.entityDie.unsubscribe(this._playerDieListener!);
    }

    private completion() {
        this.interruption();

        const magazine = this._weaponEntity.getComponent('magazine')!;
        
        magazine.storageAmmo -= magazine.capacity - magazine.ammo;
        magazine.ammo = magazine.capacity;
        if (magazine.storageAmmo < 0) {
            magazine.ammo += magazine.storageAmmo;
            magazine.storageAmmo = 0;
        }
        this._owner.sendMessage('CompleteReload.');
    }

}