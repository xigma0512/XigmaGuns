import { ComponentTypes, Component } from "../components/Component";

export interface IEntity {
    readonly uuid: string;
    readonly components: Map<keyof ComponentTypes, Component | Component[]>
}

export class Entity implements IEntity {

    readonly uuid: string;
    readonly components = new Map;

    constructor(uuid: string) {
        this.uuid = uuid;
    }
}