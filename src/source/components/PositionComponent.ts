import { Component } from "./Component";

export class PositionComponent extends Component {
    
    x: number;
    y: number;
    z: number;
    dimension: string;

    constructor(data: IPositionComponent | undefined) {
        super('position');

        this.x = data?.x ?? 0;
        this.y = data?.y ?? 0;
        this.z = data?.z ?? 0;
        this.dimension = data?.dimension ?? 'overworld';
    }
}