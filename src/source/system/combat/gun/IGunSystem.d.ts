import { Player } from "@minecraft/server";
import { IEntity } from "../../../entity/Entity";

declare type GunSystems = {
    'fire': IGunFireSystem;
    'reload': IGunReloadSystem;
    'magazine': IGunMagazineSystem;
}

declare interface IGunFireSystem {
    readonly gun: IEntity;
    fire(owner: Player): void;
}

declare interface IGunReloadSystem {
    readonly gun: IEntity;
    reload(owner: Player): void;
}

declare interface IGunMagazineSystem {
    readonly gun: IEntity;
    ammo: number;
    readonly capacity: number;
    storageAmmo: number;
    fireCheck(): boolean;
    reloaded(): void;
}