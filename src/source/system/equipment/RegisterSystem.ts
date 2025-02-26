import { Gun } from "../../entity/equipment/gun/Gun";
import { IEquipmentEntity } from "../../entity/equipment/Equipment";

import { CryptoUtils } from "../../../utils/Crypto";

export class EquipmentRegisterSystem {

    private static _equipments = new Map<string, IEquipmentEntity>;
    static get getEquipments() { return this._equipments; }

    static registerGun(data: ComponentDataType) {
        const uuid = CryptoUtils.randomUUID();
        this._equipments.set(uuid, new Gun(uuid, data));
        
        return this._equipments.get(uuid) as Gun;
    }
}