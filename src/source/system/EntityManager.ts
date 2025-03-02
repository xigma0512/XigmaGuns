import { Entity } from "../entity/Entity";
import { ItemComponent } from "../components/ItemComponent";
import { EntityType, EntityTypes } from "../../declare/entity/Entity";

import { Utils } from "../../utils/Utils";

import { Entity as mcEntity } from "@minecraft/server";
import { ItemStack } from "@minecraft/server";

export class EntityManager {

    private static _entities = new Map<string, Entity>;
    
    static getEntity(target: mcEntity | ItemStack) {
        const uuid = target.getDynamicProperty('xigmaguns:uuid') as string;
        if (uuid === undefined) return undefined;

        return this._entities.get(uuid);
    }

    static unRegisterEntity(target: ItemStack | mcEntity) {
        const uuid = target.getDynamicProperty('xigmaguns:uuid') as string;
        if (uuid === undefined) return;
        this._entities.delete(uuid);
    }

    static registerItem(type: EntityType) {
        const uuid = Utils.randomUUID();
        const entity = new EntityTypes[type](uuid);
        this._entities.set(uuid, entity);

        const itemComp = entity.getComponent('item') as ItemComponent;
        itemComp.item.setDynamicProperty('xigmaguns:uuid', uuid);
        return itemComp.item;
    }

    static registerMcEntity(type: EntityType, target: mcEntity) {
        const uuid = Utils.randomUUID();
        const entity = new EntityTypes[type](uuid);
        this._entities.set(uuid, entity);

        target.setDynamicProperty('xigmaguns:uuid', uuid);
    }

}