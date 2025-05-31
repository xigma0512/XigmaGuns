import { world } from "@minecraft/server";
function world_property(name) {
    return world.getDynamicProperty(name);
}
function set_world_property(name, value) {
    world.setDynamicProperty(name, value);
}
function entity_property(entity, name) {
    return entity.getDynamicProperty(name);
}
function set_entity_property(entity, name, value) {
    entity.setDynamicProperty(name, value);
}
function scoreboard_property(entity, name) {
    if (world.scoreboard.getObjective(name) === undefined)
        world.scoreboard.addObjective(name);
    const scoreboard = world.scoreboard.getObjective(name);
    try {
        return scoreboard.getScore(entity);
    }
    catch {
        return 0;
    }
}
function set_scoreboard_property(entity, name, value) {
    if (world.scoreboard.getObjective(name) === undefined)
        world.scoreboard.addObjective(name);
    const scoreboard = world.scoreboard.getObjective(name);
    scoreboard.setScore(entity, Number(value));
}
export { world_property, set_world_property, entity_property, set_entity_property, scoreboard_property, set_scoreboard_property };
//# sourceMappingURL=Property.js.map