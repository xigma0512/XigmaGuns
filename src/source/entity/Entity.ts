import { Utils } from "../../utils/Utils";
import { Component, ComponentTypes } from "../components/Component";

export class Entity {

    readonly uuid: string;
    protected readonly components = new Map<keyof ComponentTypes, Component>;

    constructor() {
        this.uuid = Utils.randomUUID();
    }

    hasComponent(componentId: keyof ComponentTypes) {
        return this.components.has(componentId);
    }

    getComponent<T extends keyof ComponentTypes>(componentId: T) {
        return this.components.get(componentId) as ComponentTypes[T];
    }
}