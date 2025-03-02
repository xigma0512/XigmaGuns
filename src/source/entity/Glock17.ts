import { HeaderComponent } from "../components/HeaderComponent";
import { ItemComponent } from "../components/ItemComponent";
import { MagazineComponent } from "../components/MagazineComponent";
import { Entity } from "./Entity";

export class Glock17 extends Entity {

    constructor(uuid: string, data: ComponentDataType) {
        super(uuid, 'Gun');

        this.components
            .set('header', new HeaderComponent(data.header))
            .set('item', new ItemComponent(data.item))
            .set('magazine', new MagazineComponent(data.magazine))
            .set('timer', []);
    }

}