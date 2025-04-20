import { AWP_Bullet } from "../../source/entity/bullets/AWP_Bullet";
import { Glock17_Bullet } from "../../source/entity/bullets/Glock17_Bullet";

export declare type GunTypes = keyof typeof Bullets;

export const Bullets = {
    'glock17': Glock17_Bullet,
    'awp': AWP_Bullet
};