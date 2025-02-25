import { EquipmentComponent } from "./EquipmentComponent";

export class EquipmentMagazineComponent extends EquipmentComponent {
    
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