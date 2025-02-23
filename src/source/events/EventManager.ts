import { EntityRemove } from "./before/EntityRemove";

export class EventManager {
    
    private static readonly _handlers = [
        new EntityRemove
    ] as EventHandler[];

    static registerListeners() {
        for (const inst of this._handlers) inst.subscribe();
    }

    static unregisterListeners() {
        for (const inst of this._handlers) inst.unsubscribe();
    }

}