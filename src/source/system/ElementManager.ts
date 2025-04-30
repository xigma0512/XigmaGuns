import { IElement } from "../element/Element";

import { Entity } from "@minecraft/server";
import { ItemStack } from "@minecraft/server";

export class ElementManager {

    private static _entities = new Map<string, IElement>();
    // ItemStack use dynamic property to bind Element, Entity use native id to bind element
    private static _nativeIds = new Map<string, string>(); // id, uuid

    static getElement(target: Entity | ItemStack) {
        const uuid = (target instanceof Entity) 
            ? this._nativeIds.get(target.id) 
            : target.getDynamicProperty('xigmaguns:uuid') as string | undefined;
        
        if (uuid === undefined) return undefined;
        return this._entities.get(uuid);
    }

    static removeElement(uuid: string) {
        this._entities.delete(uuid);
        for (const [id, uid] of this._nativeIds) {
            if (uid === uuid) return this._nativeIds.delete(id);
        }
    }

    static createElement(entity: IElement, target?: Entity | ItemStack) {
        this._entities.set(entity.uuid, entity);
        if (target === undefined) return;
        if (target instanceof Entity) this._nativeIds.set(entity.uuid, target.id);
        target.setDynamicProperty('xigmaguns:uuid', entity.uuid);
    }

}