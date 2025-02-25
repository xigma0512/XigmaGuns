import { EquipmentComponent } from "./EquipmentComponent";

export class EquipmentHeaderComponent extends EquipmentComponent {

    readonly name: string;
    readonly description: string[];

    constructor(name: string, description: string[]) {
        super('equipment:header');

        this.name = name;
        this.description = description;
    }
}