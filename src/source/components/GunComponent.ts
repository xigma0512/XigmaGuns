import { Component } from "./Component";

export class GunComponent extends Component {
    
    readonly damage: number;
    readonly range: number;
    readonly fireRate: number;
    readonly offset: number;
    readonly reload_time: number;

    constructor(data: IGunComponent | undefined) {
        super('gun');

        this.damage = data?.damage ?? 1;
        this.range = data?.range ?? 80;
        this.fireRate = data?.fireRate ?? 4;
        this.offset = data?.offset ?? 0;
        this.reload_time = data?.reload_time ?? 0;
    }

}