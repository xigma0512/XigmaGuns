import { BulletData } from "./data/Bullet";
import { BulletComponent } from "../components/BulletComponent";
import { ParticleComponent } from "../components/ParticleComponent";
import { PositionComponent } from "../components/PositionComponent";
import { Entity } from "./Entity";

export class Bullet extends Entity {
    constructor() {
        super();
        
        const DATA = BulletData.Bullet;
        this.components
            .set('bullet', new BulletComponent())
            .set('particle', new ParticleComponent(DATA.particle))
            .set('position', new PositionComponent(DATA.position));
    }
}