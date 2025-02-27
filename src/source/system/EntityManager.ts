import { Entity, IEntity } from "../entity/Entity";

import { CryptoUtils } from "../../utils/Crypto";

export class EntityManager {

    private static _entities = new Map<string, IEntity>;
    static getEntities() { return this._entities; }

    static registerEntity(entity: Entity) {
        const uuid = CryptoUtils.randomUUID();
        this._entities.set(uuid, entity);
        return uuid;
    }

}