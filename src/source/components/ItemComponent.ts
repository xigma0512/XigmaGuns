import { Component } from "./Component";

import { ItemStack } from "@minecraft/server";

export class ItemComponent extends Component {

    readonly typeId: string;
    readonly amount: number;
    readonly nametag: string;
    readonly lore: string[];
    readonly item: ItemStack;

    constructor(data: IItemComponent | undefined) {
        super('item');

        this.typeId = data?.typeId ?? 'minecraft:stick';
        this.amount = data?.amount ?? 1;
        this.nametag = data?.nametag ?? '';
        this.lore = data?.lore ?? [];

        this.item = new ItemStack(this.typeId, this.amount);
        this.setItem();
    }

    private setItem() {
        this.item.nameTag = this.nametag;
        this.item.setLore(this.lore);
    }
}