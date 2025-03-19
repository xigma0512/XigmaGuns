import { Component } from "./Component";

export class OffsetComponent extends Component {
    
    readonly max: number;
    readonly min: number;

    readonly shot: number;

    constructor(data: IOffsetComponent | undefined) {
        super('offset');

        this.max = data?.max ?? 2;
        this.min = data?.min ?? 0;
        
        this.shot = data?.shot ?? 0;
    }

}