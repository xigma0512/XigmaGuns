import { Player } from "@minecraft/server";
import { Component } from "./Component";

export class BulletComponent extends Component {

    private _owner?: Player;
    private _damage?: IDamageComponent;

    constructor() {
        super('bullet');
    }

    get owner() { return this._owner!; }
    get damage() { return this._damage!; }

    init(owner: Player, damage: IDamageComponent) {
        this._owner = owner;
        this._damage = damage;
    }
}