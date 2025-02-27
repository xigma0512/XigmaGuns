import { Entity, IEntity } from "../Entity";

import { HeaderComponent } from "../../components/HeaderComponent";
import { ItemComponent } from "../../components/ItemComponent";

export declare interface IEquipmentEntity extends IEntity {
    readonly type: EquipmentType;
}

export class Equipment extends Entity {
    
    readonly type: EquipmentType;

    constructor(uuid: string, type: EquipmentType) {
        super(uuid);
        this.type = type;
    }

    protected setItem() {
        const headerComp = this.components.get('xigmaguns:header') as HeaderComponent;
        const itemComp = this.components.get('xigmaguns:item') as ItemComponent;

        itemComp.item.nameTag = headerComp.name;
        itemComp.item.setLore(headerComp.description);
        itemComp.item.setDynamicProperty('xigmaguns:uuid', this.uuid);
    }

}