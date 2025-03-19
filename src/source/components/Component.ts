import { BulletComponent } from "./BulletComponent";
import { DamageComponent } from "./DamageComponent";
import { GunComponent } from "./GunComponent";
import { HeaderComponent } from "./HeaderComponent";
import { ItemComponent } from "./ItemComponent";
import { MagazineComponent } from "./MagazineComponent";
import { OffsetComponent } from "./OffsetComponent";
import { ParticleComponent } from "./ParticleComponent";
import { PositionComponent } from "./PositionComponent";
import { VectorComponent } from "./VectorComponent";

export declare type ComponentTypes = {
    'header': HeaderComponent;
    'item': ItemComponent;
    'magazine': MagazineComponent;
    'particle': ParticleComponent;
    'position': PositionComponent;
    'vector': VectorComponent;
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