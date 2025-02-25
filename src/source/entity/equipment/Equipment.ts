import { EquipmentComponent, EquipmentComponentTypes } from "../../components/Equipment/EquipmentComponent";

import { EquipmentHeaderComponent } from "../../components/Equipment/HeaderComponent";
import { EquipmentItemComponent } from "../../components/Equipment/ItemComponent";

export declare interface IEquipmentEntity {
    readonly uuid: string;
    readonly type: EquipmentType;
    readonly components: Map<keyof EquipmentComponentTypes, EquipmentComponent>;
}

export class Equipment implements IEquipmentEntity {
    
    readonly uuid: string;
    readonly type: EquipmentType;

    readonly components = new Map<keyof EquipmentComponentTypes, EquipmentComponent>;

    constructor(uuid: string, type: EquipmentType) {
        this.uuid = uuid;
        this.type = type;
    }

    protected setItem() {
        const headerComp = this.components.get('equipment:header') as EquipmentHeaderComponent;
        const itemComp = this.components.get('equipment:item') as EquipmentItemComponent;

        itemComp.item.nameTag = headerComp.name;
        itemComp.item.setLore(headerComp.description);
        itemComp.item.setDynamicProperty('xigmaguns:uuid', this.uuid);
    }

}