import { IEntity } from "../../../entity/Entity";

export class GunMagazineSystem {

    readonly gun: IEntity;

    constructor(gun: IEntity) {
        this.gun = gun;
    }

    get ammo() { return this.gun.getComponent('magazine')!.ammo; }
    set ammo(value: number) { this.gun.getComponent('magazine')!.ammo = value; }
    
    get capacity() { return this.gun.getComponent('magazine')!.capacity; }
    
    get storageAmmo() { return this.gun.getComponent('magazine')!.storageAmmo; }
    set storageAmmo(value: number) { this.gun.getComponent('magazine')!.storageAmmo = value; }

    fireCheck() {
        if (this.ammo === 0) return false;
        this.ammo--;
        return true;
    }

    reloaded() {
        this.storageAmmo -= this.capacity - this.ammo;
        this.ammo = this.capacity;
        if (this.storageAmmo < 0) {
            this.ammo += this.storageAmmo;
            this.storageAmmo = 0;
        }
    }

}