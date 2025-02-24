import { WeaponComponent } from "./WeaponComponent";

export class WeaponMagazineComponent extends WeaponComponent {
    
    ammo: number;
    storageAmmo: number;
    readonly capacity: number;

    constructor(ammo: number, count: number = 1) {
        super('weapon:magazine');
        
        this.ammo = ammo;
        this.capacity = ammo;
        this.storageAmmo = ammo * count;
    }
}