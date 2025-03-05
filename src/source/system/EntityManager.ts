import { Entity } from "../entity/Entity";

import { Entity as mcEntity } from "@minecraft/server";
import { ItemStack } from "@minecraft/server";

export class EntityManager {

    private static _entities = new Map<string, Entity>;
    
    static getEntity(target: mcEntity | ItemStack) {
        const uuid = target.getDynamicProperty('xigmaguns:uuid') as string;
        if (uuid === undefined) return undefined;

        return this._entities.get(uuid);
    }

    static unRegisterEntity(uuid: string) {
        this._entities.delete(uuid);
    }

    static registerEntity(entity: Entity, target?: ItemStack | mcEntity) {
        this._entities.set(entity.uuid, entity);
        if (target === undefined) return;
        target.setDynamicProperty('xigmaguns:uuid', entity.uuid);
    }
}