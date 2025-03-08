import { Player } from "@minecraft/server";

export class PlayerChangeHotbarEvent {

    readonly player: Player;
    readonly previousSelect: number;
    readonly currentSelect: number;

    private constructor(player: Player, previousSelect: number, currentSelect: number) {
        this.player = player;
        this.previousSelect = previousSelect;
        this.currentSelect = currentSelect;
    }

    static create(player: Player, previousSelect: number, currentSelect: number) {
        return new this(player, previousSelect, currentSelect);
    }
}

export class PlayerChangeHotbarEventSignal {

    private _listeners: ((event: PlayerChangeHotbarEvent) => void)[] = [];

    subscribe(callback: (event: PlayerChangeHotbarEvent) => void) {
        this._listeners.push(callback);
        return callback;
    }

    unsubscribe(callback: (event: PlayerChangeHotbarEvent) => void) {
        const index = this._listeners.indexOf(callback);
        if (index === -1) return;
        this._listeners.splice(index, 1);
    }

    trigger(event: PlayerChangeHotbarEvent) {
        for (const listener of this._listeners) {
            listener(event);
        }
    }
}