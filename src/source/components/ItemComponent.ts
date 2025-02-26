import { Component } from "./Component";

import { ItemStack } from "@minecraft/server";

export class ItemComponent extends Component {

    readonly typeId: string;
    readonly amount: number;
    readonly item: ItemStack;

    constructor(typeId: string, amount: number) {
        super('xigmaguns:item');

        this.typeId = typeId;
        this.amount = amount;

        this.item = new ItemStack(this.typeId, this.amount);
    }
}