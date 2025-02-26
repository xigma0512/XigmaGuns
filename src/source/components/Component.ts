import { HeaderComponent } from "./HeaderComponent";
import { ItemComponent } from "./ItemComponent";
import { MagazineComponent } from "./MagazineComponent";

export declare type ComponentTypes = {
    'equipment:header': HeaderComponent;
    'equipment:item': ItemComponent;
    'equipment:magazine': MagazineComponent;
}

export class Component {
    readonly componentId: string
    constructor(id: string = 'Unknown') {
        this.componentId = id;
    }
}