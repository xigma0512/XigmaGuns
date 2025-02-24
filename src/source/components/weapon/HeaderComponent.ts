import { WeaponComponent } from "./WeaponComponent";

export class WeaponHeaderComponent extends WeaponComponent {
    
    readonly name: string;
    readonly description: string[];
    
    constructor(name: string, description: string[]) {
        super('weapon:header');

        this.name = name;
        this.description = description;
    }
}