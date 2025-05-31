import { Entity, ItemStack, world } from "@minecraft/server"

type WorldPropertyList = {
}

type EntityPropertyList = {
    'is_moving': boolean;
    'uuid': string;
}

type ScoreBoardPropertyList = {
    'is_alive': boolean;
    'team': number; /* XigmaFireline.TeamTagEnum */
}

type WorldPropertyId = keyof WorldPropertyList;
type EntityPropertyId = keyof EntityPropertyList;
type ScoreBoardPropertyId = keyof ScoreBoardPropertyList;

function world_property<T extends WorldPropertyId>(name: T) {
    return world.getDynamicProperty(name) as WorldPropertyList[T];
}

function set_world_property<T extends WorldPropertyId>(name: T, value: WorldPropertyList[T]) {
    world.setDynamicProperty(name, value);
}

function entity_property<T extends EntityPropertyId>(entity: Entity | ItemStack, name: T) {
    return entity.getDynamicProperty(name) as EntityPropertyList[T];
}

function set_entity_property<T extends EntityPropertyId>(entity: Entity | ItemStack, name: T, value: EntityPropertyList[T]) {
    entity.setDynamicProperty(name, value);
}

function scoreboard_property<T extends ScoreBoardPropertyId>(entity: Entity, name: T) {
    if (world.scoreboard.getObjective(name) === undefined) world.scoreboard.addObjective(name);

    const scoreboard = world.scoreboard.getObjective(name);
    try { return scoreboard!.getScore(entity) as ScoreBoardPropertyList[T]; }
    catch { return 0; }
}

function set_scoreboard_property<T extends ScoreBoardPropertyId>(entity: Entity, name: T, value: ScoreBoardPropertyList[T]) {
    if (world.scoreboard.getObjective(name) === undefined) world.scoreboard.addObjective(name);

    const scoreboard = world.scoreboard.getObjective(name);
    scoreboard!.setScore(entity, Number(value));
}

export { 
    world_property, set_world_property, 
    entity_property, set_entity_property, 
    scoreboard_property, set_scoreboard_property
};