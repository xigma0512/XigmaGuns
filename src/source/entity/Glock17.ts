import { HeaderComponent } from "../components/HeaderComponent";
import { ItemComponent } from "../components/ItemComponent";
import { MagazineComponent } from "../components/MagazineComponent";
import { Entity } from "./Entity";

export class Glock17 extends Entity {

    constructor(uuid: string, data: ComponentDataType) {
        super(uuid, 'Gun');

        this.components
            .set('xigmaguns:header', new HeaderComponent(data["xigmaguns:header"]?.name, data["xigmaguns:header"]?.description))
            .set('xigmaguns:item', new ItemComponent(data["xigmaguns:item"]?.typeId, data["xigmaguns:item"]?.amount))
            .set('xigmaguns:magazine', new MagazineComponent(data["xigmaguns:magazine"]?.ammo, data["xigmaguns:magazine"]?.count))
            .set('xigmaguns:timer', []);
    }

}