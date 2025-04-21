import { Player } from "@minecraft/server";
import { BulletComponent } from "../../components/BulletComponent";
import { GunData } from "../data/Guns";
import { Entity } from "../Entity";

export class AWP_Bullet extends Entity {
    constructor(owner: Player) {
        super('awp_bullet');

        const DATA = GunData.AWP;
        this.components
            .set('bullet', new BulletComponent({
                owner: owner,
                damage: DATA.damage!
            }));
    }
}