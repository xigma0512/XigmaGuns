import { Component, ComponentTypes } from "../../components/Component";

import { HeaderComponent } from "../../components/HeaderComponent";
import { ItemComponent } from "../../components/ItemComponent";

export declare interface IEquipmentEntity {
    readonly uuid: string;
    readonly type: EquipmentType;
    readonly components: Map<keyof ComponentTypes, Component>;
}

export class Equipment implements IEquipmentEntity {
    
    readonly uuid: string;
    readonly type: EquipmentType;

    readonly components = new Map<keyof ComponentTypes, Component>;

    constructor(uuid: string, type: EquipmentType) {
        this.uuid = uuid;
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