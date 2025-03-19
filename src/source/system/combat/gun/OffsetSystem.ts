import { Utils } from "../../../../utils/Utils";
import { OffsetComponent } from "../../../components/OffsetComponent";
import { customEvents } from "../../../event/custom/CustomEventManager";
import { IntervalTask, TaskManager } from "../../TaskManager";

import { Player, world } from "@minecraft/server";

const VALUES = {
    walk: 0.01,
    sprint: 0.04,
    jump: 0.07,
    refresh: 1
}

export class PlayerOffsetManager {

    private static _players = new Map<string, PlayerOffset>();
    static get(player: Player) { return this._players.get(player.id)!; }
    static remove(playerId: string) { this._players.delete(playerId); }
    static register(player: Player) {
        const playerOffset = new PlayerOffset(player);
        this._players.set(player.id, playerOffset);
    }

}

class PlayerOffset {

    readonly owner: Player;
    
    maxOffset: number = 1;
    minOffset: number = 0;
    shotOffset: number = 0;

    constructor(owner: Player) {
        this.owner = owner;
        this.execute();
    }

    shooting() {
        this.modifyOffset(this.shotOffset);
    }

    private refreshing() {
        const isMoving = this.owner.getDynamicProperty('xigmaguns:is_moving') as boolean;
        const isShooting = this.owner.getDynamicProperty('xigmaguns:is_shooting') as boolean;
        if (isMoving || isShooting) return;
        this.modifyOffset(-VALUES.refresh);
    }

    private moving() {
        const isMoving = this.owner.getDynamicProperty('xigmaguns:is_moving') as boolean;
        if (!isMoving) return;
        this.modifyOffset(VALUES[(this.owner.isSneaking) ? 'walk' : 'sprint']);
    }


    private updateOffset() {
        this.maxOffset = 1;
        this.minOffset = 0;
        this.shotOffset = 0;

        const entity = Utils.getHandEquippedItemEntity(this.owner);
        if (entity === undefined) return;

        const offsetComponent = entity.getComponent('offset')!;
        this.maxOffset = offsetComponent.max;
        this.minOffset = offsetComponent.min;
        this.shotOffset = offsetComponent.shot;

        this.owner.setDynamicProperty('xigmaguns:offset', this.minOffset);
    }


    private execute() {

        const playerChangeHotbar = customEvents.playerChangeHotbar.subscribe(ev => {
            if (ev.player.id !== this.owner.id) return;
            this.updateOffset();
        });

        const taskId = TaskManager.executeTask(new IntervalTask({
            tickFunction: () => {
                this.refreshing();
                this.moving();
            }
        }));

        const playerLeave = world.afterEvents.playerLeave.subscribe(ev => {
            if (ev.playerId !== this.owner.id) return;

            TaskManager.removeTask(taskId);

            customEvents.playerChangeHotbar.unsubscribe(playerChangeHotbar);
            world.afterEvents.playerLeave.unsubscribe(playerLeave);

            PlayerOffsetManager.remove(ev.playerId);
        });
    }

    private modifyOffset(value: number) {
        const currentOffset = this.owner.getDynamicProperty('xigmaguns:offset') as number;
        let newValue = currentOffset + value;
        if (newValue >= this.maxOffset) newValue = this.maxOffset;
        if (newValue <= this.minOffset) newValue = this.minOffset;
        this.owner.setDynamicProperty('xigmaguns:offset', newValue);
    }

}