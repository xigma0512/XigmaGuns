import { Utils } from "../../../../utils/Utils";
import { Entity } from "../../../entity/Entity";
import { IntervalTask, TaskManager, TimeoutTask } from "../../TaskManager";

import { Player, world } from "@minecraft/server";

class OffsetSystem {

    static readonly _MOVEMENT_OFFSET = {
        walk: 0.05,
        sprint: 0.08,
        jump: 0.15,
        upper_limit: 5,
        lower_limit: 0
    }

    static readonly _REFRESH_OFFSET = {
        value: 1
    }

    static getLimit(player: Player) {
        const isMoving = player.getDynamicProperty('xigmaguns:is_moving') as boolean;
        const isShooting = player.getDynamicProperty('xigmaguns:is_shooting') as boolean;
        
        const gun = Utils.getHandEquippedItemEntity(player);
        if (gun !== undefined) {
            const gunOffset = gun.getComponent('shot_offset')!;
            if (isShooting && isMoving) {
                return [
                    this._MOVEMENT_OFFSET.upper_limit + gunOffset.upper_limit,
                    this._MOVEMENT_OFFSET.lower_limit + gunOffset.upper_limit
                ];
            }
            if (isShooting && !isMoving) {
                return [ gunOffset.upper_limit, gunOffset.lower_limit ];
            }
        } 
        return [this._MOVEMENT_OFFSET.upper_limit, this._MOVEMENT_OFFSET.lower_limit];
    }

    static modifyOffset(player: Player, value: number) {
        const currentOffset = player.getDynamicProperty('xigmaguns:offset') as number;
        let newValue = currentOffset + value;
        const [max, min] = this.getLimit(player);
        if (newValue > max) newValue = max;
        if (newValue < min) newValue = min;
        player.setDynamicProperty('xigmaguns:offset', newValue);
    }

}

class MovementOffset {

    private readonly _player: Player;
    private _taskId = -1;

    constructor(player: Player) {
        this._player = player;
        this.execute();
    }

    private execute() {
        this._taskId = TaskManager.executeTask(new IntervalTask({
            tickFunction: () => {
                const isMoving = this._player.getDynamicProperty('xigmaguns:is_moving') as boolean;
                const isJumping = this._player.isJumping;
                const isSneaking = this._player.isSneaking;
                if (isMoving) OffsetSystem.modifyOffset(this._player, OffsetSystem._MOVEMENT_OFFSET[(isSneaking ? 'walk' : 'sprint')]);
                if (isJumping) OffsetSystem.modifyOffset(this._player, OffsetSystem._MOVEMENT_OFFSET.jump);
            }
        }));
    }

    close() {
        TaskManager.removeTask(this._taskId);
    }

}

class ShootingOffset {

    private readonly _player: Player;

    constructor(player: Player) {
        this._player = player;
    }

    shot(entity: Entity) {
        if (entity === undefined) return;
        const shotOffset = entity.getComponent('shot_offset');
        if (shotOffset === undefined) return;

        OffsetSystem.modifyOffset(this._player, shotOffset.value);
    }

}

class RefreshOffset {

    private readonly _player: Player;
    private _taskId = -1;

    constructor(player: Player) {
        this._player = player;
        this.execute();
    }

    private execute() {
        this._taskId = TaskManager.executeTask(new IntervalTask({
            tickFunction: () => {
                const isMoving = this._player.getDynamicProperty('xigmaguns:is_moving') as boolean;
                const isShooting = this._player.getDynamicProperty('xigmaguns:is_shooting') as boolean;

                if (isMoving || isShooting) return;
                OffsetSystem.modifyOffset(this._player, -OffsetSystem._REFRESH_OFFSET.value);
            }
        }));
    }

    close() {
        TaskManager.removeTask(this._taskId);
    }

}

export class PlayerOffsetManager {

    private static _instance: PlayerOffsetManager;
    static get instance() { return (this._instance || (this._instance = new this())); }

    private readonly _players: Map<string, {refresh: RefreshOffset, movement: MovementOffset, shooting: ShootingOffset}>;

    private constructor() {
        this._players = new Map();

        world.afterEvents.playerSpawn.subscribe(spawnEvent => {
            if (!spawnEvent.initialSpawn) return;
            const player = spawnEvent.player;
            this.create(player);

            const playerLeave = world.afterEvents.playerLeave.subscribe(ev => {
                if (ev.playerId !== player.id) return;
                this.get(player).movement.close();
                this.get(player).refresh.close();
                this.remove(player);
                world.afterEvents.playerLeave.unsubscribe(playerLeave);
            });
        });
    }

    create(player: Player) {
        TaskManager.executeTask(new TimeoutTask({
            executeFunction: () => {
                this._players.set(player.id, {
                    refresh: new RefreshOffset(player),
                    movement: new MovementOffset(player),
                    shooting: new ShootingOffset(player)
                });
            }
        }));
    }

    remove(player: Player) {
        this._players.delete(player.id);
    }

    get(player: Player) {
        return this._players.get(player.id)!;
    }

}