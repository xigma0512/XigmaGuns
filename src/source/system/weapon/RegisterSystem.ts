import { Gun } from "../../entity/equipment/gun/Gun";
import { IEquipmentEntity } from "../../entity/equipment/Equipment";

import { CryptoUtils } from "../../../utils/Crypto";

export class EquipmentRegisterSystem {

    private static _Equipments = new Map<string, IEquipmentEntity>;
    static get getEquipments() { return this._Equipments; }

    static registerGun(data: IGunData) {
        const uuid = CryptoUtils.randomUUID();
        this._Equipments.set(uuid, new Gun(uuid, data));
        
        return this._Equipments.get(uuid) as Gun;
    }
}