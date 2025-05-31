import { PlayerChangeHotbarEventSignal } from "./PlayerChangeHotbar";

class CustomEventManager {
    private static _instance: CustomEventManager;
    static get instance() { return this._instance || (this._instance = new this()); }
    
    private constructor() {}
    
    readonly playerChangeHotbar = new PlayerChangeHotbarEventSignal();
}
export const customEvents = CustomEventManager.instance;