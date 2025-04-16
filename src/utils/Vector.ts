import { Vector3, VectorXZ } from "@minecraft/server";

export class Vector {

    static add(v1: Vector3, v2: Vector3 | number): Vector3 {
        return {
            x: v1.x + (typeof v2 === "object" ? v2.x : v2),
            y: v1.y + (typeof v2 === "object" ? v2.y : v2),
            z: v1.z + (typeof v2 === "object" ? v2.z : v2)
        };
    }

    static sub(v1: Vector3, v2: Vector3 | number): Vector3 {
        return {
            x: v1.x - (typeof v2 === "object" ? v2.x : v2),
            y: v1.y - (typeof v2 === "object" ? v2.y : v2),
            z: v1.z - (typeof v2 === "object" ? v2.z : v2)
        };
    }

    static mul(v1: Vector3, v2: Vector3 | number): Vector3 {
        return {
            x: v1.x * (typeof v2 === "object" ? v2.x : v2),
            y: v1.y * (typeof v2 === "object" ? v2.y : v2),
            z: v1.z * (typeof v2 === "object" ? v2.z : v2)
        };
    }

    static div(v1: Vector3, v2: Vector3 | number): Vector3 {
        return {
            x: v1.x / (typeof v2 === "object" ? v2.x : v2),
            y: v1.y / (typeof v2 === "object" ? v2.y : v2),
            z: v1.z / (typeof v2 === "object" ? v2.z : v2)
        };
    }

    static dot(v1: Vector3, v2: Vector3) {
        return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
    }

    static distance(v1: Vector3, v2: Vector3) {
        const [dx, dy, dz] = [v2.x - v1.x, v2.y - v1.y, v2.z - v1.z];
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }

    static flatten2d(vec: Vector3) {
        return { x: vec.x, y: 0, z: vec.z };
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

    get unit() {
        return { 
            x: this.x / this.length,
            y: this.y / this.length,
            z: this.z / this.length
        };
    }

}