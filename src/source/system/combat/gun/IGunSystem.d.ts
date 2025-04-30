import { Player } from "@minecraft/server";
import { IElement } from "../../../element/Element";

declare type GunSystems = {
    'fire': IGunFireSystem;
    'reload': IGunReloadSystem;
    'magazine': IGunMagazineSystem;
}

declare interface IGunFireSystem {
    readonly gun: IElement;
    fire(owner: Player): void;
}

declare interface IGunReloadSystem {
    readonly gun: IElement;
    reload(owner: Player): void;
}

declare interface IGunMagazineSystem {
    readonly gun: IElement;
    ammo: number;
    readonly capacity: number;
    storageAmmo: number;
    fireCheck(): boolean;
    reloaded(): void;
}