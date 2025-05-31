import { GunData } from "../data/Guns";
import { Element } from "../Element";

import { GunComponent } from "../../components/GunComponent";
import { ItemComponent } from "../../components/ItemComponent";
import { MagazineComponent } from "../../components/MagazineComponent";
import { DamageComponent } from "../../components/DamageComponent";
import { OffsetComponent } from "../../components/OffsetComponent";

import { GunSystemManager } from "../../system/combat/gun/GunSystemManager";

export class AWP extends Element {

    constructor() {
        super('awp');

        const DATA = GunData.AWP;
        this.components
            .set('item', new ItemComponent(DATA.item))
            .set('magazine', new MagazineComponent(DATA.magazine))
            .set('gun', new GunComponent(DATA.gun))
            .set('offset', new OffsetComponent(DATA.offset))
            .set('damage', new DamageComponent(DATA.damage));

        GunSystemManager.instance.register(this);
    }

}