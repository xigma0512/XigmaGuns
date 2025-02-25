import { Component } from "../Component";

import { EquipmentHeaderComponent } from "./HeaderComponent";
import { EquipmentItemComponent } from "./ItemComponent";
import { EquipmentMagazineComponent } from "./MagazineComponent";

export declare type EquipmentComponentTypes = {
    'equipment:header': EquipmentHeaderComponent;
    'equipment:item': EquipmentItemComponent;
    'equipment:magazine': EquipmentMagazineComponent;
}

export class EquipmentComponent extends Component {
    constructor(componentId: keyof EquipmentComponentTypes) {
        super(componentId);
    }
}