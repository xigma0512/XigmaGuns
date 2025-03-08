import { Player } from "@minecraft/server";
import { Component } from "./Component";

export class BulletComponent extends Component {

    private _owner: Player | undefined;
    private _damage: number = 0;
    private _range: number = 0;

    constructor() {
        super('bullet');
    }

    get owner() { return this._owner; }
    get damage() { return this._damage; }
    get range() { return this._range; }

    setInfo(owner: Player, damage: number, range: number) {
        this._owner = owner;
        this._damage = damage;
        this._range = range;
    }
}