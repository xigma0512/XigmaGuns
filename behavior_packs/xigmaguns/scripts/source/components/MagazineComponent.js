import { Component } from "./Component";
export class MagazineComponent extends Component {
    ammo;
    storageAmmo;
    capacity;
    constructor(data) {
        super('magazine');
        this.ammo = data?.ammo ?? 12;
        this.capacity = this.ammo;
        this.storageAmmo = this.ammo * (data?.count ?? 3);
        ;
    }
}
//# sourceMappingURL=MagazineComponent.js.map