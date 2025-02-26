import { HeaderComponent } from "./HeaderComponent";
import { ItemComponent } from "./ItemComponent";
import { MagazineComponent } from "./MagazineComponent";
import { TimerComponent } from "./TimerComponent";

export declare type ComponentTypes = {
    'xigmaguns:header': HeaderComponent;
    'xigmaguns:item': ItemComponent;
    'xigmaguns:magazine': MagazineComponent;
    'xigmaguns:timer': TimerComponent;
}

export class Component {
    readonly componentId: string
    constructor(id: string = 'Unknown') {
        this.componentId = id;
    }
}