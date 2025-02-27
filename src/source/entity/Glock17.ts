import { HeaderComponent } from "../components/HeaderComponent";
import { ItemComponent } from "../components/ItemComponent";
import { MagazineComponent } from "../components/MagazineComponent";
import { Entity } from "./Entity";

export class Glock17 extends Entity {

    constructor(uuid: string, data: ComponentDataType) {
        super(uuid, 'Gun');

        this.components
            .set('header', new HeaderComponent(data["header"]?.name, data["header"]?.description))
            .set('item', new ItemComponent(data["item"]?.typeId, data["item"]?.amount))
            .set('magazine', new MagazineComponent(data["magazine"]?.ammo, data["magazine"]?.count))
            .set('timer', []);
    }

}