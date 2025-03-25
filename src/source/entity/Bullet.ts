import { BulletData } from "./data/Bullet";
import { BulletComponent } from "../components/BulletComponent";
import { PositionComponent } from "../components/PositionComponent";
import { Entity } from "./Entity";

export class Bullet extends Entity {
    constructor() {
        super();
        
        const DATA = BulletData.Bullet;
        this.components
            .set('bullet', new BulletComponent())
            .set('position', new PositionComponent(DATA.position));
    }
}