import { IBulletComponent, BulletComponentData } from "./BulletComponent";
import { IDamageComponent, DamageComponentData } from "./DamageComponent";
import { IGunComponent, GunComponentData } from "./GunComponent";
import { IHeaderComponent, HeaderComponentData } from "./HeaderComponent";
import { IItemComponent, ItemComponentData } from "./ItemComponent";
import { IMagazineComponent, MagazineComponentData } from "./MagazineComponent";
import { IOffsetComponent, OffsetComponentData } from "./OffsetComponent";

export declare interface ComponentTypes {
    'header': IHeaderComponent;
    'item': IItemComponent;
    'magazine': IMagazineComponent;
    'gun': IGunComponent;
    'bullet': IBulletComponent;
    'damage': IDamageComponent;
    'offset': IOffsetComponent;
}

export declare type ComponentDataTypes = {
    'header'?: HeaderComponentData;
    'item'?: ItemComponentData;
    'magazine'?: MagazineComponentData;
    'gun'?: GunComponentData;
    'bullet'?: BulletComponentData;
    'damage'?: DamageComponentData;
    'offset'?: OffsetComponentData;
}

export class Component {
    readonly componentId: string
    constructor(id: string = 'Unknown') {
        this.componentId = id;
    }
}