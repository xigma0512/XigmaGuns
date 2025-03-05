import { Bullet } from "../../source/entity/Bullet";
import { Glock17 } from "../../source/entity/Glock17";
import { SmokeGrenade } from "../../source/entity/SmokeGrenade";

declare type EntityTypes = {
    'glock17': Glock17,
    'smoke_grenade': SmokeGrenade,
    'bullet': Bullet
}

export type EntityType = keyof EntityTypes;