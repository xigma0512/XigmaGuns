import { Entity } from "../entity/Entity";

import { CryptoUtils } from "../../utils/Crypto";

import { Entity as mcEntity } from "@minecraft/server";
import { ItemStack } from "@minecraft/server";

type EntityType = mcEntity | ItemStack;

export class EntityManager {

    private static _entities = new Map<string, Entity>;
    
    static getEntity(entity: EntityType) {
        const uuid = entity.getDynamicProperty('xigmaguns:uuid') as string;
        if (uuid === undefined) throw "[ERROR] This Entity doesn't have property: 'xigmaguns:uuid'";

        const en = this._entities.get(uuid) as Entity;
        if (en === undefined) throw `[ERROR] Cannot found entity with uuid: ${uuid}`;

        return this._entities.get(uuid) as Entity;
    }

    static registerEntity(entity: Entity) {
        const uuid = CryptoUtils.randomUUID();
        this._entities.set(uuid, entity);
        return uuid;
    }

}