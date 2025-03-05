import { BulletComponent } from "./BulletComponent";
import { GunComponent } from "./GunComponent";
import { HeaderComponent } from "./HeaderComponent";
import { ItemComponent } from "./ItemComponent";
import { MagazineComponent } from "./MagazineComponent";
import { ParticleComponent } from "./ParticleComponent";
import { PositionComponent } from "./PositionComponent";
import { TimerComponent } from "./TimerComponent";
import { VectorComponent } from "./VectorComponent";

export declare type ComponentTypes = {
    'header': HeaderComponent;
    'item': ItemComponent;
    'magazine': MagazineComponent;
    'particle': ParticleComponent;
    'timer': TimerComponent;
    'position': PositionComponent;
    'vector': VectorComponent;
    'gun': GunComponent;
    'bullet': BulletComponent;
}

export class Component {
    readonly componentId: string
    constructor(id: string = 'Unknown') {
        this.componentId = id;
    }
}