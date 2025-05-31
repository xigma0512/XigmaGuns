import { BulletComponent } from "../../components/BulletComponent";
import { GunData } from "../data/Guns";
import { Element } from "../Element";
export class AWP_Bullet extends Element {
    constructor(owner) {
        super('awp_bullet');
        const DATA = GunData.AWP;
        this.components
            .set('bullet', new BulletComponent({
            owner: owner,
            damage: DATA.damage
        }));
    }
}
//# sourceMappingURL=AWP_Bullet.js.map