import { Entity } from "../../../entity/Entity";
import { BulletHandler } from "./BulletHandler";
import { IntervalTask, TaskManager } from "../../TaskManager";
import { EntityManager } from "../../EntityManager";

import { world } from "@minecraft/server";
import { EntityDieAfterEvent, ItemStopUseAfterEvent } from "@minecraft/server";
import { ItemStack, Player } from "@minecraft/server";

export class GunFireProcess {

    private readonly _owner: Player;
    private readonly _weaponEntity: Entity;

    private _taskId = -1;

    private _itemStopUseListener?: EventType<ItemStopUseAfterEvent>;
    private _playerDieListener?: EventType<EntityDieAfterEvent>;

    constructor(owner: Player, weaponItem: ItemStack) {
        this._owner = owner;
        this._weaponEntity = EntityManager.getEntity(weaponItem)!;
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
                    return new BulletHandler(this._owner, this._weaponEntity);
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
        TaskManager.removeTask(this._taskId);
        world.afterEvents.itemStopUse.unsubscribe(this._itemStopUseListener!);
        world.afterEvents.entityDie.unsubscribe(this._playerDieListener!);
    }

}