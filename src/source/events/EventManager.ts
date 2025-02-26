import { ItemStartUse } from "./after/ItemStartUse";
import { ItemStopUse } from "./after/ItemStopUse";
import { EntityRemove } from "./before/EntityRemove";

export class EventManager {
    
    private static readonly _handlers = [
        new EntityRemove,
        new ItemStartUse,
        new ItemStopUse
    ] as EventHandler[];

    static registerListeners() {
        for (const inst of this._handlers) inst.subscribe();
    }

    static unregisterListeners() {
        for (const inst of this._handlers) inst.unsubscribe();
    }

}