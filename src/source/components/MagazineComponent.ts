import { Component } from "./Component";

export interface IMagazineComponent {
    ammo: number;
    storageAmmo: number;
    readonly capacity: number;
}

export class MagazineComponent extends Component {
    
    ammo: number;
    storageAmmo: number;
    readonly capacity: number;

    constructor(data?: IMagazineComponent) {
        super('magazine');
        
        this.ammo = data?.ammo ?? 12;
        this.capacity = this.ammo;
        this.storageAmmo = data?.storageAmmo ?? 36; 
    }
}