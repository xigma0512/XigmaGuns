import { Component } from "./Component";

export interface IMagazineComponent {
    ammo: number;
    storageAmmo: number;
    readonly capacity: number;
}

export type MagazineComponentData = {
    ammo: number;
    count: number;
}

export class MagazineComponent extends Component {
    
    ammo: number;
    storageAmmo: number;
    readonly capacity: number;

    constructor(data?: MagazineComponentData) {
        super('magazine');
        
        this.ammo = data?.ammo ?? 12;
        this.capacity = this.ammo;
        this.storageAmmo = this.ammo * (data?.count ?? 3);; 
    }
}