import { IElement } from "../element/Element";

import { Entity as mcEntity } from "@minecraft/server";
import { ItemStack } from "@minecraft/server";

export class ElementManager {

    private static _entities = new Map<string, IElement>;

    static getElement(target: mcEntity | ItemStack) {
        const uuid = target.getDynamicProperty('xigmaguns:uuid') as string;
        if (uuid === undefined) return undefined;

        return this._entities.get(uuid);
    }

    static removeElement(uuid: string) {
        this._entities.delete(uuid);
    }

    static createElement(entity: IElement, target?: ItemStack | mcEntity) {
        this._entities.set(entity.uuid, entity);
        if (target === undefined) return;
        target.setDynamicProperty('xigmaguns:uuid', entity.uuid);
    }

}