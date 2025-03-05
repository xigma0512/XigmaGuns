import { ThrowableData } from "../../declare/entityData/Throwables";
import { ParticleComponent } from "../components/ParticleComponent";
import { Entity } from "./Entity";

export class SmokeGrenade extends Entity {
    constructor(uuid: string) {
        super(uuid);

        const DATA = ThrowableData.SmokeGrenade;
        this.components
            .set('particle', new ParticleComponent(DATA.particle))
            .set('timer', []);
    }
}