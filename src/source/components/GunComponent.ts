import { Component } from "./Component";

export class GunComponent extends Component {
    
    readonly damage: number;
    readonly range: number;
    readonly fireRate: number;

    constructor(data: IGunComponent | undefined) {
        super('gun');

        this.damage = data?.damage ?? 1;
        this.range = data?.range ?? 80;
        this.fireRate = data?.fireRate ?? 4;
    }

}