import { IElement } from "../../../element/Element";
import { FullyAutoFire, SemiAutoFire } from "./GunFireSystem";
import { GunMagazineSystem } from "./GunMagazineSystem";
import { GunReloadSystem } from "./GunReloadSystem";
import { GunSystems } from "./IGunSystem";

export class GunSystemManager {

    private static _instance: GunSystemManager;
    static get instance() { return (this._instance || (this._instance = new this())); }

    private _systems: Map<string, GunSystems>;

    private constructor() {
        this._systems = new Map;
    }

    get(uuid: string) {
        return this._systems.get(uuid);
    }

    register(gun: IElement) {
        const gunComponent = gun.getComponent('gun')!;

        const fireHandlers = (gunComponent.fireMode === 'semi-auto') ? new SemiAutoFire(gun) : new FullyAutoFire(gun);

        this._systems.set(gun.uuid, {
            fire: fireHandlers,
            reload: new GunReloadSystem(gun),
            magazine: new GunMagazineSystem(gun)
        });
    }

    remove(uuid: string) {
        this._systems.delete(uuid);
    }

}