import { Component } from "./Component";

export class ShotOffsetComponent extends Component {
    
    readonly upper_limit: number;
    readonly lower_limit: number;

    readonly value: number;

    constructor(data: IShotOffsetComponent | undefined) {
        super('shot_offset');

        this.upper_limit = data?.upper_limit ?? 2;
        this.lower_limit = data?.lower_limit ?? 0;
        
        this.value = data?.value ?? 0;
    }

}