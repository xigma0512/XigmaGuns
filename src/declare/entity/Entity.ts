import { Glock17 } from "../../source/entity/Glock17";

export const EntityTypes = {
    'glock17': Glock17,
}

export type EntityType = keyof typeof EntityTypes;