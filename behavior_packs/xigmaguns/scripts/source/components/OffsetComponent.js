import { Component } from "./Component";
export class OffsetComponent extends Component {
    hipfire;
    scope;
    movement;
    constructor(data) {
        super('offset');
        this.hipfire = data?.hipfire ?? 0;
        this.scope = data?.scope ?? 0;
        this.movement = data?.movement ?? 0;
    }
}
//# sourceMappingURL=OffsetComponent.js.map