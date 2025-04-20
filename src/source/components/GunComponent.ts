import { Component } from "./Component";

export interface IGunComponent {
    readonly fireMode: FireModeType;

    readonly releaseToFire: boolean; 
    
    readonly bulletSpread: number;
    readonly fireRate: number;
    readonly reload_time: number;
}

export type GunComponentData = IGunComponent;

export class GunComponent extends Component {
    
    readonly fireMode: FireModeType;
    
    readonly releaseToFire: boolean;
    
    readonly bulletSpread: number;
    readonly fireRate: number;
    readonly reload_time: number;

    constructor(data?: GunComponentData) {
        super('gun');

        this.fireMode = data?.fireMode ?? 'fully-auto';
        this.bulletSpread = data?.bulletSpread ?? 1;
        this.releaseToFire = data?.releaseToFire ?? false;
        this.fireRate = data?.fireRate ?? 4;
        this.reload_time = data?.reload_time ?? 0;
    }

}