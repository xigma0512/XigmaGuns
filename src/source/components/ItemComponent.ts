import { Component } from "./Component";

import { ItemStack } from "@minecraft/server";

export class ItemComponent extends Component {

    readonly typeId: string;
    readonly amount: number;
    readonly item: ItemStack;

    constructor(data: IItemComponent | undefined) {
        super('item');

        this.typeId = data?.typeId ?? 'minecraft:stick';
        this.amount = data?.amount ?? 1;

        this.item = new ItemStack(this.typeId, this.amount);
    }
}