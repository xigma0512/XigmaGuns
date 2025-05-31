export class PlayerChangeHotbarEvent {
    player;
    previousSelect;
    currentSelect;
    constructor(player, previousSelect, currentSelect) {
        this.player = player;
        this.previousSelect = previousSelect;
        this.currentSelect = currentSelect;
    }
    static create(player, previousSelect, currentSelect) {
        return new this(player, previousSelect, currentSelect);
    }
}
export class PlayerChangeHotbarEventSignal {
    _listeners = [];
    subscribe(callback) {
        this._listeners.push(callback);
        return callback;
    }
    unsubscribe(callback) {
        const index = this._listeners.indexOf(callback);
        if (index === -1)
            return;
        this._listeners.splice(index, 1);
    }
    trigger(event) {
        for (const listener of this._listeners) {
            listener(event);
        }
    }
}
//# sourceMappingURL=PlayerChangeHotbar.js.map