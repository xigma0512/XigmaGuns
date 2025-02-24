import { Gun } from "../../entity/weapon/gun/Gun";
import { IWeaponEntity } from "../../entity/weapon/Weapon";

import { CryptoUtils } from "../../../utils/Crypto";

export class WeaponRegisterSystem {

    private static _weapons = new Map<string, IWeaponEntity>;
    static get getWeapons() { return this._weapons; }

    static registerGun(data: IGunData) {
        const uuid = CryptoUtils.randomUUID();
        this._weapons.set(uuid, new Gun(uuid, data));
        
        return this._weapons.get(uuid) as Gun;
    }
}