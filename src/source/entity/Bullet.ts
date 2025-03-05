import { BulletData } from "../../declare/entityData/Bullet";
import { BulletComponent } from "../components/BulletComponent";
import { ParticleComponent } from "../components/ParticleComponent";
import { PositionComponent } from "../components/PositionComponent";
import { VectorComponent } from "../components/VectorComponent";
import { Entity } from "./Entity";

export class Bullet extends Entity {
    constructor() {
        super();
        
        const DATA = BulletData.Bullet;
        this.components
            .set('bullet', new BulletComponent())
            .set('particle', new ParticleComponent(DATA.particle))
            .set('position', new PositionComponent(DATA.position))
            .set('vector', new VectorComponent())
    }
}