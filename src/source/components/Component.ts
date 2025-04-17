import { IBulletComponent } from "./BulletComponent";
import { IDamageComponent } from "./DamageComponent";
import { IGunComponent } from "./GunComponent";
import { IHeaderComponent } from "./HeaderComponent";
import { IItemComponent } from "./ItemComponent";
import { IMagazineComponent } from "./MagazineComponent";
import { IOffsetComponent } from "./OffsetComponent";
import { IPositionComponent } from "./PositionComponent";

export declare type ComponentTypes = {
    'header'?: IHeaderComponent;
    'item'?: IItemComponent;
    'magazine'?: IMagazineComponent;
    'position'?: IPositionComponent;
    'gun'?: IGunComponent;
    'bullet'?: IBulletComponent;
    'damage'?: IDamageComponent;
    'offset'?: IOffsetComponent;
}

export class Component {
    readonly componentId: string
    constructor(id: string = 'Unknown') {
        this.componentId = id;
    }
}