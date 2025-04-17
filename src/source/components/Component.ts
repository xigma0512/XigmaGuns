import { BulletComponent } from "./BulletComponent";
import { DamageComponent } from "./DamageComponent";
import { GunComponent } from "./GunComponent";
import { HeaderComponent } from "./HeaderComponent";
import { ItemComponent } from "./ItemComponent";
import { MagazineComponent } from "./MagazineComponent";
import { OffsetComponent } from "./OffsetComponent";
import { PositionComponent } from "./PositionComponent";

export declare type ComponentTypes = {
    'header': HeaderComponent;
    'item': ItemComponent;
    'magazine': MagazineComponent;
    'position': PositionComponent;
    'gun': GunComponent;
    'bullet': BulletComponent;
    'damage': DamageComponent;
    'offset': OffsetComponent;
}

export class Component {
    readonly componentId: string
    constructor(id: string = 'Unknown') {
        this.componentId = id;
    }
}