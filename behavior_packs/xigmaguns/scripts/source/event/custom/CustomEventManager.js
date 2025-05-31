import { PlayerChangeHotbarEventSignal } from "./PlayerChangeHotbar";
class CustomEventManager {
    static _instance;
    static get instance() { return this._instance || (this._instance = new this()); }
    constructor() { }
    playerChangeHotbar = new PlayerChangeHotbarEventSignal();
}
export const customEvents = CustomEventManager.instance;
//# sourceMappingURL=CustomEventManager.js.map