import { Component } from "./Component";
export class BulletComponent extends Component {
    owner;
    damage;
    constructor(data) {
        super('bullet');
        this.owner = data.owner;
        this.damage = data.damage;
    }
}
//# sourceMappingURL=BulletComponent.js.map