import { Component } from "./Component";

export interface IGunComponent {
    readonly fireRate: number;
    readonly reload_time: number;
}

export class GunComponent extends Component {
    
    readonly fireRate: number;
    readonly reload_time: number;

    constructor(data?: IGunComponent) {
        super('gun');

        this.fireRate = data?.fireRate ?? 4;
        this.reload_time = data?.reload_time ?? 0;
    }

}