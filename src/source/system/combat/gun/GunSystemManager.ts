import { IEntity } from "../../../entity/Entity";
import { GunFireSystem } from "./GunFireSystem";
import { GunMagazineSystem } from "./GunMagazineSystem";
import { GunReloadSystem } from "./GunReloadSystem";

type GunSystems = {
    'fire': GunFireSystem;
    'reload': GunReloadSystem;
    'magazine': GunMagazineSystem;
}

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

    register(gun: IEntity) {
        this._systems.set(gun.uuid, {
            fire: new GunFireSystem(gun),
            reload: new GunReloadSystem(gun),
            magazine: new GunMagazineSystem(gun)
        });
    }

    remove(uuid: string) {
        this._systems.delete(uuid);
    }

}