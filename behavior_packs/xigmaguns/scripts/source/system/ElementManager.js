import { Entity } from "@minecraft/server";
import { entity_property, set_entity_property } from "../../utils/Property";
export class ElementManager {
    static _entities = new Map();
    // ItemStack use dynamic property to bind Element, Entity use native id to bind element
    static _nativeIds = new Map(); // id, uuid
    static getElement(target) {
        const uuid = (target instanceof Entity)
            ? this._nativeIds.get(target.id)
            : entity_property(target, 'uuid');
        if (uuid === undefined)
            return undefined;
        return this._entities.get(uuid);
    }
    static removeElement(uuid) {
        this._entities.delete(uuid);
        for (const [id, uid] of this._nativeIds) {
            if (uid === uuid)
                return this._nativeIds.delete(id);
        }
    }
    static createElement(entity, target) {
        this._entities.set(entity.uuid, entity);
        if (target === undefined)
            return;
        if (target instanceof Entity)
            this._nativeIds.set(target.id, entity.uuid);
        set_entity_property(target, 'uuid', entity.uuid);
    }
}
//# sourceMappingURL=ElementManager.js.map