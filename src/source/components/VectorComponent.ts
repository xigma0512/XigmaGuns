import { Vector3 } from "@minecraft/server";
import { Component } from "./Component";

export class VectorComponent extends Component {
    
    private _x: number = 0;
    private _y: number = 0;
    private _z: number = 0;

    constructor() {
        super('vector');
    }

    get x() { return this._x; }
    get y() { return this._y; }
    get z() { return this._z; }

    setVector(v3: Vector3) {
        this._x = v3.x / 10;
        this._y = v3.y / 10;
        this._z = v3.z / 10;
    }
}