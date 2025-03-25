import { Player } from "@minecraft/server";
import { Component } from "./Component";
import { DamageComponent } from "./DamageComponent";

export class BulletComponent extends Component {

    private _owner?: Player;
    private _damage?: DamageComponent;

    constructor() {
        super('bullet');
    }

    get owner() { return this._owner!; }
    get damage() { return this._damage!; }

    register(owner: Player, damage: DamageComponent) {
        this._owner = owner;
        this._damage = damage;
    }
}