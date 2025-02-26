import { Equipment, IEquipmentEntity } from "../Equipment";

import { HeaderComponent } from "../../../components/HeaderComponent";
import { ItemComponent } from "../../../components/ItemComponent";
import { MagazineComponent } from "../../../components/MagazineComponent";

export declare interface IGunEntity extends IEquipmentEntity {
    fire(): boolean;
    reload(): boolean;
}

export class Gun extends Equipment implements IGunEntity {

    constructor(uuid: string, data: IGunData) {
        super(uuid, 'Gun');

        this.components
            .set('equipment:header', new HeaderComponent(data.components["equipment:header"].name, data.components["equipment:header"].description))
            .set('equipment:item', new ItemComponent(data.components["equipment:item"].typeId, data.components["equipment:item"].amount))
            .set('equipment:magazine', new MagazineComponent(data.components["equipment:magazine"].ammo, data.components["equipment:magazine"].count));
        
        this.setItem();
    }

    fire() {
        const magazineComp = this.components.get('equipment:magazine') as MagazineComponent;

        if (magazineComp.ammo === 0) return this.reload();
        
        magazineComp.ammo --;
        return true;
    }

    reload() {
        const magazineComp = this.components.get('equipment:magazine') as MagazineComponent;

        if (magazineComp.ammo === magazineComp.capacity) return false;

        magazineComp.storageAmmo -= magazineComp.capacity - magazineComp.ammo;
        magazineComp.ammo = magazineComp.capacity;

        if (magazineComp.storageAmmo < 0) {
            magazineComp.ammo += magazineComp.storageAmmo;
            magazineComp.storageAmmo = 0;
        }
        return true;
    }

}