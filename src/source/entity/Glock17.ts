import { GunData } from "../../declare/entityData/Guns";
import { Entity } from "./Entity";

import { GunComponent } from "../components/GunComponent";
import { HeaderComponent } from "../components/HeaderComponent";
import { ItemComponent } from "../components/ItemComponent";
import { MagazineComponent } from "../components/MagazineComponent";

export class Glock17 extends Entity {

    constructor() {
        super();

        const DATA = GunData.Glock17;
        this.components
            .set('header', new HeaderComponent(DATA.header))
            .set('item', new ItemComponent(DATA.item))
            .set('magazine', new MagazineComponent(DATA.magazine))
            .set('gun', new GunComponent(DATA.gun));
    }

}