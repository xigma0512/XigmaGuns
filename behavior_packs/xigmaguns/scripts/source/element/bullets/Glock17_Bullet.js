import { BulletComponent } from "../../components/BulletComponent";
import { GunData } from "../data/Guns";
import { Element } from "../Element";
export class Glock17_Bullet extends Element {
    constructor(owner) {
        super('glock17_bullet');
        const DATA = GunData.Glock17;
        this.components
            .set('bullet', new BulletComponent({
            owner: owner,
            damage: DATA.damage
        }));
    }
}
//# sourceMappingURL=Glock17_Bullet.js.map