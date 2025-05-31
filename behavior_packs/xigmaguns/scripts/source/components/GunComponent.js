import { Component } from "./Component";
export class GunComponent extends Component {
    fireMode;
    releaseToFire;
    bulletSpread;
    fireRate;
    shackingLevel;
    shackingDuration;
    reload_time;
    constructor(data) {
        super('gun');
        this.fireMode = data?.fireMode ?? 'fully-auto';
        this.bulletSpread = data?.bulletSpread ?? 1;
        this.releaseToFire = data?.releaseToFire ?? false;
        this.fireRate = data?.fireRate ?? 4;
        this.shackingLevel = data?.shackingLevel ?? 0.05;
        this.shackingDuration = data?.shackingDuration ?? 0.15;
        this.reload_time = data?.reload_time ?? 0;
    }
}
//# sourceMappingURL=GunComponent.js.map