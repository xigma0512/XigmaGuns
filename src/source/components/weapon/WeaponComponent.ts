import { Component } from "../Component";

import { WeaponHeaderComponent } from "./HeaderComponent"
import { WeaponItemComponent } from "./ItemComponent"
import { WeaponMagazineComponent } from "./MagazineComponent"

export declare type WeaponComponentTypes = {
    'weapon:header': WeaponHeaderComponent;
    'weapon:item': WeaponItemComponent;
    'weapon:magazine': WeaponMagazineComponent;
}

export class WeaponComponent extends Component {
    constructor(componentId: keyof WeaponComponentTypes) {
        super(componentId);
    }
}