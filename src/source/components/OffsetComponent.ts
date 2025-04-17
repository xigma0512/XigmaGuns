import { Component } from "./Component";

export interface IOffsetComponent {
    readonly hippie: number;
    readonly scope: number;
    readonly movement: number;
}

export class OffsetComponent extends Component {

    readonly hippie: number;
    readonly scope: number;
    readonly movement: number;

    constructor(data?: IOffsetComponent) {
        super('offset');

        this.hippie = data?.hippie ?? 0;
        this.scope = data?.scope ?? 0;
        this.movement = data?.movement ?? 0;
    }
}