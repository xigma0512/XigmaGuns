import { Equipment, IEquipmentEntity } from "../Equipment";

import { HeaderComponent } from "../../../components/HeaderComponent";
import { ItemComponent } from "../../../components/ItemComponent";
import { MagazineComponent } from "../../../components/MagazineComponent";

export declare interface IGunEntity extends IEquipmentEntity {
    fire(): boolean;
    reload(): boolean;
}

export class Gun extends Equipment implements IGunEntity {

    constructor(uuid: string, data: ComponentDataType) {
        super(uuid, 'Gun');

        this.components
            .set('xigmaguns:header', new HeaderComponent(data["xigmaguns:header"]?.name, data["xigmaguns:header"]?.description))
            .set('xigmaguns:item', new ItemComponent(data["xigmaguns:item"]?.typeId, data["xigmaguns:item"]?.amount))
            .set('xigmaguns:magazine', new MagazineComponent(data["xigmaguns:magazine"]?.ammo, data["xigmaguns:magazine"]?.count))
            .set('xigmaguns:timer', []);
        
        this.setItem();
    }

    fire() {
        const magazineComp = this.components.get('xigmaguns:magazine') as MagazineComponent;

        if (magazineComp.ammo === 0) return false;
        
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