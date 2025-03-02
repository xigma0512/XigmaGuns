import { HeaderComponent } from "./HeaderComponent";
import { ItemComponent } from "./ItemComponent";
import { MagazineComponent } from "./MagazineComponent";
import { ParticleComponent } from "./ParticleComponent";
import { TimerComponent } from "./TimerComponent";

export declare type ComponentTypes = {
    'header': HeaderComponent;
    'item': ItemComponent;
    'magazine': MagazineComponent;
    'particle': ParticleComponent;
    'timer': TimerComponent;
}

export class Component {
    readonly componentId: string
    constructor(id: string = 'Unknown') {
        this.componentId = id;
    }
}