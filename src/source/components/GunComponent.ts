import { Component } from "./Component";

export interface IGunComponent {
    readonly fireRate: number;
    readonly reload_time: number;
}

export type GunComponentData = IGunComponent;

export class GunComponent extends Component {
    
    readonly fireRate: number;
    readonly reload_time: number;

    constructor(data?: GunComponentData) {
        super('gun');

        this.fireRate = data?.fireRate ?? 4;
        this.reload_time = data?.reload_time ?? 0;
    }

}