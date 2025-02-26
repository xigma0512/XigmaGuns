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
            .set('xigmaguns:header', new HeaderComponent(data.components["xigmaguns:header"].name, data.components["xigmaguns:header"].description))
            .set('xigmaguns:item', new ItemComponent(data.components["xigmaguns:item"].typeId, data.components["xigmaguns:item"].amount))
            .set('xigmaguns:magazine', new MagazineComponent(data.components["xigmaguns:magazine"].ammo, data.components["xigmaguns:magazine"].count));
        
        this.setItem();
    }

    fire() {
        const magazineComp = this.components.get('xigmaguns:magazine') as MagazineComponent;

        if (magazineComp.ammo === 0) return this.reload();
        
        magazineComp.ammo --;
        return true;
    }

    reload() {
        const magazineComp = this.components.get('xigmaguns:magazine') as MagazineComponent;

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