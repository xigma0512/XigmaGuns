import { Entity } from "../../../entity/Entity";
import { GunFireSystem } from "./GunFireSystem";
import { GunMagazineSystem } from "./GunMagazineSystem";
import { GunReloadSystem } from "./GunReloadSystem";

interface IGunSystems {
    readonly fire: GunFireSystem;
    readonly reload: GunReloadSystem;
    readonly magazine: GunMagazineSystem;
}

export class GunSystemManager {

    private static _instance: GunSystemManager;
    static get instance() { return (this._instance || (this._instance = new this())); }

    private _systems: Map<string, IGunSystems>;

    private constructor() {
        this._systems = new Map;
    }

    get(uuid: string) {
        return this._systems.get(uuid);
    }

    register(gun: Entity) {
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