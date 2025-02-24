import { IGunEntity } from "../../entity/weapon/gun/Gun";

export class GunActionSystem {

    static fire(gunEntity: IGunEntity) {
        return gunEntity.fire();
    }

    static reload(gunEntity: IGunEntity) {
        return gunEntity.reload();
    }

}