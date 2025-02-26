import { HeaderComponent } from "./HeaderComponent";
import { ItemComponent } from "./ItemComponent";
import { MagazineComponent } from "./MagazineComponent";

export declare type ComponentTypes = {
    'xigmaguns:header': HeaderComponent;
    'xigmaguns:item': ItemComponent;
    'xigmaguns:magazine': MagazineComponent;
}

export class Component {
    readonly componentId: string
    constructor(id: string = 'Unknown') {
        this.componentId = id;
    }
}