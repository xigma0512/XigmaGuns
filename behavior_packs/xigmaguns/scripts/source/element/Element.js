import { Utils } from "../../utils/Utils";
export class Element {
    uuid;
    typeId;
    components = new Map;
    constructor(typeId) {
        this.uuid = Utils.randomUUID();
        this.typeId = typeId;
    }
    hasComponent(componentId) {
        return this.components.has(componentId);
    }
    getComponent(componentId) {
        return this.components.get(componentId);
    }
}
//# sourceMappingURL=Element.js.map