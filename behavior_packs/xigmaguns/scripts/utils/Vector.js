export class Vector {
    static add(v1, v2) {
        return {
            x: v1.x + (typeof v2 === "object" ? v2.x : v2),
            y: v1.y + (typeof v2 === "object" ? v2.y : v2),
            z: v1.z + (typeof v2 === "object" ? v2.z : v2)
        };
    }
    static sub(v1, v2) {
        return {
            x: v1.x - (typeof v2 === "object" ? v2.x : v2),
            y: v1.y - (typeof v2 === "object" ? v2.y : v2),
            z: v1.z - (typeof v2 === "object" ? v2.z : v2)
        };
    }
    static mul(v1, v2) {
        return {
            x: v1.x * (typeof v2 === "object" ? v2.x : v2),
            y: v1.y * (typeof v2 === "object" ? v2.y : v2),
            z: v1.z * (typeof v2 === "object" ? v2.z : v2)
        };
    }
    static div(v1, v2) {
        return {
            x: v1.x / (typeof v2 === "object" ? v2.x : v2),
            y: v1.y / (typeof v2 === "object" ? v2.y : v2),
            z: v1.z / (typeof v2 === "object" ? v2.z : v2)
        };
    }
    static dot(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
    }
    static distance(v1, v2) {
        const [dx, dy, dz] = [v2.x - v1.x, v2.y - v1.y, v2.z - v1.z];
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }
    static flatten2d(vec) {
        return { x: vec.x, y: 0, z: vec.z };
    }
}
export class RayVector {
    x;
    y;
    z;
    constructor(v1, v2) {
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
//# sourceMappingURL=Vector.js.map