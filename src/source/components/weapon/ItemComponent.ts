import { WeaponComponent } from "./WeaponComponent";

import { ItemStack } from "@minecraft/server";

export class WeaponItemComponent extends WeaponComponent {

    readonly typeId: string;
    readonly amount: number;
    readonly item: ItemStack;

    constructor(typeId: string, amount: number) {
        super('weapon:item');

        this.typeId = typeId;
        this.amount = amount;

        this.item = new ItemStack(this.typeId, this.amount);
    }
}