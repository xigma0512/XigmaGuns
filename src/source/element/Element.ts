import { Utils } from "../../utils/Utils";
import { Component, ComponentTypes } from "../components/Component";

export interface IElement {
    readonly uuid: string;
    readonly typeId: string;

    hasComponent(componentId: keyof ComponentTypes): boolean;
    getComponent<T extends keyof ComponentTypes>(componentId: T): ComponentTypes[T] | undefined;
}

export class Element {

    readonly uuid: string;
    readonly typeId: string;
    protected readonly components = new Map<keyof ComponentTypes, Component>;

    constructor(typeId: string) {
        this.uuid = Utils.randomUUID();
        this.typeId = typeId;
    }

    hasComponent(componentId: keyof ComponentTypes) {
        return this.components.has(componentId);
    }

    getComponent<T extends keyof ComponentTypes>(componentId: T) {
        return this.components.get(componentId) as ComponentTypes[T] | undefined;
    }
}