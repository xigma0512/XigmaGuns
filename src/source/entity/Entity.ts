import { Component, ComponentTypes } from "../components/Component";

export class Entity {

    readonly uuid: string;
    readonly type: EntityType;
    readonly components = new Map<keyof ComponentTypes, Component | Component[]>;

    constructor(uuid: string, type: EntityType) {
        this.uuid = uuid;
        this.type = type;
    }
}