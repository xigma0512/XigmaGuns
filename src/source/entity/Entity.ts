import { Component, ComponentTypes } from "../components/Component";

export class Entity {

    readonly uuid: string;
    readonly type: EntityType;
    protected readonly components = new Map<keyof ComponentTypes, Component | Component[]>;

    constructor(uuid: string, type: EntityType) {
        this.uuid = uuid;
        this.type = type;
    }

    hasComponent(componentId: keyof ComponentTypes) {
        return this.components.has(componentId);
    }

    getComponent(componentId: keyof ComponentTypes) {
        return this.components.get(componentId);
    }

    setComponent(componentId: keyof ComponentTypes, data: Component | Component[]) {
        return this.components.set(componentId, data);
    }
}