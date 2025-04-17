import { Component } from "./Component";

export interface IPositionComponent {
    x: number;
    y: number;
    z: number;
    dimension: string;
}

export class PositionComponent extends Component {
    
    x: number;
    y: number;
    z: number;
    dimension: string;

    constructor(data?: IPositionComponent) {
        super('position');

        this.x = data?.x ?? 0;
        this.y = data?.y ?? 0;
        this.z = data?.z ?? 0;
        this.dimension = data?.dimension ?? 'overworld';
    }
}