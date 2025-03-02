import { Component } from "./Component";

export class MagazineComponent extends Component {
    
    ammo: number;
    storageAmmo: number;
    readonly capacity: number;

    constructor(data: IMagazineComponent | undefined) {
        super('magazine');
        
        this.ammo = data?.ammo ?? 12;
        this.capacity = this.ammo;
        this.storageAmmo = this.ammo * (data?.count ?? 3);
    }
}