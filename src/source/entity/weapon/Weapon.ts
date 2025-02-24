import { WeaponComponent, WeaponComponentTypes } from "../../components/weapon/WeaponComponent";

import { WeaponHeaderComponent } from "../../components/weapon/HeaderComponent";
import { WeaponItemComponent } from "../../components/weapon/ItemComponent";

export declare interface IWeaponEntity {
    readonly uuid: string;
    readonly type: WeaponType;
    readonly components: Map<keyof WeaponComponentTypes, WeaponComponent>;
}

export class Weapon implements IWeaponEntity {
    
    readonly uuid: string;
    readonly type: WeaponType;

    readonly components = new Map<keyof WeaponComponentTypes, WeaponComponent>;

    constructor(uuid: string, type: WeaponType) {
        this.uuid = uuid;
        this.type = type;
    }

    protected setItem() {
        const headerComp = this.components.get('weapon:header') as WeaponHeaderComponent;
        const itemComp = this.components.get('weapon:item') as WeaponItemComponent;

        itemComp.item.nameTag = headerComp.name;
        itemComp.item.setLore(headerComp.description);
        itemComp.item.setDynamicProperty('xigmaguns:uuid', this.uuid);
    }

}