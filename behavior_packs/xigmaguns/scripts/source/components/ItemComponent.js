import { Component } from "./Component";
import { ItemStack } from "@minecraft/server";
export class ItemComponent extends Component {
    typeId;
    amount;
    nametag;
    lore;
    item;
    constructor(data) {
        super('item');
        this.typeId = data?.typeId ?? 'minecraft:stick';
        this.amount = data?.amount ?? 1;
        this.nametag = data?.nametag ?? '';
        this.lore = data?.lore ?? [];
        this.item = new ItemStack(this.typeId, this.amount);
        this.setItem();
    }
    setItem() {
        this.item.nameTag = this.nametag;
        this.item.setLore(this.lore);
    }
}
//# sourceMappingURL=ItemComponent.js.map