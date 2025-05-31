import { Component } from "./Component";

export interface IDamageComponent {
    readonly near: DamageType;
    readonly medium: DamageType;
    readonly far: DamageType;
}

export type DamageComponentData = IDamageComponent;

export class DamageComponent extends Component {
    
    readonly near: DamageType;
    readonly medium: DamageType;
    readonly far: DamageType;

    constructor(data?: DamageComponentData) {
        super('damage');

        this.near = data?.near ?? {head:0, body: 0, legs: 0};
        this.medium = data?.medium ?? {head:0, body: 0, legs: 0};
        this.far = data?.far ?? {head:0, body: 0, legs: 0};
    }

}