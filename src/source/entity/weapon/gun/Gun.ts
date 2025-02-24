import { IWeaponEntity, Weapon } from "../Weapon";

import { WeaponHeaderComponent } from "../../../components/weapon/HeaderComponent";
import { WeaponItemComponent } from "../../../components/weapon/ItemComponent";
import { WeaponMagazineComponent } from "../../../components/weapon/MagazineComponent";

export declare interface IGunEntity extends IWeaponEntity {
    fire(): boolean;
    reload(): boolean;
}

export class Gun extends Weapon implements IGunEntity {

    constructor(uuid: string, data: IGunData) {
        super(uuid, 'Gun');

        this.components
            .set('weapon:header', new WeaponHeaderComponent(data.components["weapon:header"].name, data.components["weapon:header"].description))
            .set('weapon:item', new WeaponItemComponent(data.components["weapon:item"].typeId, data.components["weapon:item"].amount))
            .set('weapon:magazine', new WeaponMagazineComponent(data.components["weapon:magazine"].ammo, data.components["weapon:magazine"].count));
        
        this.setItem();
    }

    fire() {
        const magazineComp = this.components.get('weapon:magazine') as WeaponMagazineComponent;

        if (magazineComp.ammo === 0) return this.reload();
        
        magazineComp.ammo --;
        return true;
    }

    reload() {
        const magazineComp = this.components.get('weapon:magazine') as WeaponMagazineComponent;

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