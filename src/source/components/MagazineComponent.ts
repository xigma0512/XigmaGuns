import { Component } from "./Component";

export class MagazineComponent extends Component {
    
    ammo: number;
    storageAmmo: number;
    readonly capacity: number;

    constructor(ammo: number, count: number = 1) {
        super('equipment:magazine');
        
        this.ammo = ammo;
        this.capacity = ammo;
        this.storageAmmo = ammo * count;
    }
}