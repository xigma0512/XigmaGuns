import { Component } from "./Component";
export class DamageComponent extends Component {
    near;
    medium;
    far;
    constructor(data) {
        super('damage');
        this.near = data?.near ?? { head: 0, body: 0, legs: 0 };
        this.medium = data?.medium ?? { head: 0, body: 0, legs: 0 };
        this.far = data?.far ?? { head: 0, body: 0, legs: 0 };
    }
}
//# sourceMappingURL=DamageComponent.js.map