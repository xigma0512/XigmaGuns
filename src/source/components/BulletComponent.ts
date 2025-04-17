import { Player } from "@minecraft/server";
import { Component } from "./Component";
import { IDamageComponent } from "./DamageComponent";

export interface IBulletComponent {
    readonly owner: Player;
    readonly damage: IDamageComponent;
}

export class BulletComponent extends Component {

    readonly owner: Player;
    readonly damage: IDamageComponent;

    constructor(data: IBulletComponent) {
        super('bullet');

        this.owner = data.owner;
        this.damage = data.damage;
    }
}