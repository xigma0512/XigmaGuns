import { FullyAutoFire, SemiAutoFire } from "./GunFireSystem";
import { GunMagazineSystem } from "./GunMagazineSystem";
import { GunReloadSystem } from "./GunReloadSystem";
export class GunSystemManager {
    static _instance;
    static get instance() { return (this._instance || (this._instance = new this())); }
    _systems;
    constructor() {
        this._systems = new Map;
    }
    get(uuid) {
        return this._systems.get(uuid);
    }
    register(gun) {
        const gunComponent = gun.getComponent('gun');
        const fireHandlers = (gunComponent.fireMode === 'semi-auto') ? new SemiAutoFire(gun) : new FullyAutoFire(gun);
        this._systems.set(gun.uuid, {
            fire: fireHandlers,
            reload: new GunReloadSystem(gun),
            magazine: new GunMagazineSystem(gun)
        });
    }
    remove(uuid) {
        this._systems.delete(uuid);
    }
}
//# sourceMappingURL=GunSystemManager.js.map