import { ComponentTypes, Component } from "../components/Component";

export interface IEntity {
    readonly uuid: string;
    readonly type: EntityType;
    readonly components: Map<keyof ComponentTypes, Component | Component[]>;
}

export class Entity implements IEntity {

    readonly uuid: string;
    readonly type: EntityType;
    readonly components = new Map;

    constructor(uuid: string, type: EntityType) {
        this.uuid = uuid;
        this.type = type;
    }
}