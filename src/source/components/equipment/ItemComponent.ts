import { EquipmentComponent } from "./EquipmentComponent";

import { ItemStack } from "@minecraft/server";

export class EquipmentItemComponent extends EquipmentComponent {

    readonly typeId: string;
    readonly amount: number;
    readonly item: ItemStack;

    constructor(typeId: string, amount: number) {
        super('equipment:item');

        this.typeId = typeId;
        this.amount = amount;

        this.item = new ItemStack(this.typeId, this.amount);
    }
}