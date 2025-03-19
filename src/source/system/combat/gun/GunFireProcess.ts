import { Entity } from "../../../entity/Entity";
import { BulletHandler } from "./BulletHandler";
import { IntervalTask, TaskManager } from "../../TaskManager";

import { world } from "@minecraft/server";
import { EntityDieAfterEvent, ItemStopUseAfterEvent } from "@minecraft/server";
import { Player } from "@minecraft/server";
import { PlayerOffsetManager } from "./OffsetSystem";

export class GunFireProcess {

    private readonly _owner: Player;
    private readonly _weaponEntity: Entity;

    private _taskId = -1;

    private _itemStopUseListener?: EventType<ItemStopUseAfterEvent>;
    private _playerDieListener?: EventType<EntityDieAfterEvent>;

    constructor(owner: Player, weaponEntity: Entity) {
        this._owner = owner;
        this._weaponEntity = weaponEntity;
        if (this._weaponEntity === undefined) throw '[ERROR] 找不到實體資料';
    }

    execute() {
        const gunComp = this._weaponEntity.getComponent('gun')!;

        const consumeAmmo = () => {
            const magazineComp = this._weaponEntity.getComponent('magazine')!;
            if (magazineComp.ammo === 0) return false;
            magazineComp.ammo--;
            return true;
        }

        this._taskId = TaskManager.executeTask(new IntervalTask({
            duration: 3600,
            interval: gunComp.fireRate,
            tickFunction: () => {
                if (consumeAmmo()) {
                    this._owner.setDynamicProperty('xigmaguns:is_shooting', true);
                    PlayerOffsetManager.get(this._owner).shooting();
                    new BulletHandler(this._owner, this._weaponEntity);
                    return;
                }
                this._owner.onScreenDisplay.setActionBar('YOU HAVE NO AMMO.');
            }
        }));
        this.watchInterruptions();
    }

    private watchInterruptions() {
        this._itemStopUseListener = world.afterEvents.itemStopUse.subscribe(ev => {
            if (ev.source.id === this._owner.id) this.interruption();
        });
    
        this._playerDieListener = world.afterEvents.entityDie.subscribe(ev => {
            if (!(ev.deadEntity instanceof Player)) return;
            if (ev.deadEntity.id === this._owner.id) this.interruption();
        });
    }

    private interruption() {
        this._owner.setDynamicProperty('xigmaguns:is_shooting', false);
        TaskManager.removeTask(this._taskId);
        world.afterEvents.itemStopUse.unsubscribe(this._itemStopUseListener!);
        world.afterEvents.entityDie.unsubscribe(this._playerDieListener!);
    }

}