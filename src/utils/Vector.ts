import { Vector3 } from "@minecraft/server";

export class Vector {

    static add(left: Vector3, right: Vector3 | number): Vector3 {
        return {
            x: left.x + (typeof right === "object" ? right.x : right),
            y: left.y + (typeof right === "object" ? right.y : right),
            z: left.z + (typeof right === "object" ? right.z : right)
        };
    }

    static sub(left: Vector3, right: Vector3 | number): Vector3 {
        return {
            x: left.x - (typeof right === "object" ? right.x : right),
            y: left.y - (typeof right === "object" ? right.y : right),
            z: left.z - (typeof right === "object" ? right.z : right)
        };
    }

    static mul(left: Vector3, right: Vector3 | number): Vector3 {
        return {
            x: left.x * (typeof right === "object" ? right.x : right),
            y: left.y * (typeof right === "object" ? right.y : right),
            z: left.z * (typeof right === "object" ? right.z : right)
        };
    }

    static div(left: Vector3, right: Vector3 | number): Vector3 {
        return {
            x: left.x / (typeof right === "object" ? right.x : right),
            y: left.y / (typeof right === "object" ? right.y : right),
            z: left.z / (typeof right === "object" ? right.z : right)
        };
    }

    static distance(v1: Vector3, v2: Vector3) {
        const [dx, dy, dz] = [v2.x - v1.x, v2.y - v1.y, v2.z - v1.z];
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }

}

export class RayVector {
    
    readonly x: number;
    readonly y: number;
    readonly z: number;

    constructor(v1: Vector3, v2: Vector3) {
        this.x = v2.x - v1.x;
        this.y = v2.y - v1.y;
        this.z = v2.z - v1.z;
    }
    
    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    get unit() {;
        return { 
            x: this.x / this.length,
            y: this.y / this.length,
            z: this.z / this.length
        };
    }

}