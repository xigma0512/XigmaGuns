import { ThrowableData } from "./data/Throwables";
import { Entity } from "./Entity";

import { ParticleComponent } from "../components/ParticleComponent";

export class SmokeGrenade extends Entity {
    constructor() {
        super();

        const DATA = ThrowableData.SmokeGrenade;
        this.components
            .set('particle', new ParticleComponent(DATA.particle));
    }
}