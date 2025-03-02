import { Component } from "./Component";

export class ParticleComponent extends Component {

    readonly typeId: string;
    readonly interval: number;
    readonly duration: number;
    
    constructor(data: IParticleComponent | undefined) {
        super('particle');

        this.typeId = data?.typeId ?? 'minecraft:large_explosion';
        this.interval = data?.interval ?? -1;
        this.duration = data?.duration ?? 300;
    }

}