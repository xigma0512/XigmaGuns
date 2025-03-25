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

    static ray_vector(v1: Vector3, v2: Vector3) {
        return {x: v2.x - v1.x, y: v2.y - v1.y, z: v2.z - v1.z};
    }

    static distance(v1: Vector3, v2: Vector3) {
        const [dx, dy, dz] = [v2.x - v1.x, v2.y - v1.y, v2.z - v1.z];
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }

    static ray_length(vec: Vector3) {
        return Math.sqrt(vec.x * vec.x + vec.y * vec.y + vec.z * vec.z);
    }

    static unit(vec: Vector3) {
        const dist = this.ray_length(vec);
        return {x: vec.x / dist, y: vec.y / dist, z: vec.z / dist};
    }

}