console.log = (...data) => {
    world.sendMessage(JSON.stringify(data));
};
import { system, world } from "@minecraft/server";
import { ElementManager } from "../source/system/ElementManager";
import { Glock17 } from "../source/element/guns/Glock17";
import { Vector } from "./Vector";
import { AWP } from "../source/element/guns/AWP";
system.afterEvents.scriptEventReceive.subscribe(ev => {
    if (ev.id === 'xg:test') {
        const glock = new Glock17;
        ElementManager.createElement(glock, glock.getComponent('item').item);
        ev.sourceEntity?.getComponent('inventory')?.container?.addItem(glock.getComponent('item').item);
        ev.sourceEntity?.setDynamicProperty('xigmaguns:team', 1);
        const awp = new AWP;
        ElementManager.createElement(awp, awp.getComponent('item').item);
        ev.sourceEntity?.getComponent('inventory')?.container?.addItem(awp.getComponent('item').item);
        ev.sourceEntity?.setDynamicProperty('xigmaguns:team', 1);
        // for (const player of world.getAllPlayers()) {
        //     console.warn(player.name, player.getDynamicProperty('team'), player.getDynamicProperty('is_alive'));
        // }
    }
});
system.runInterval(() => {
    for (const player of world.getPlayers()) {
        const headLocation = Vector.add(player.getHeadLocation(), player.getViewDirection());
        const location = Vector.add(headLocation, { x: 0, y: 0, z: 0 });
        // player.spawnParticle('minecraft:basic_flame_particle', location);
    }
});
// system.runInterval(()=>{
//     const map = new MolangVariableMap();
//     map.setFloat('variable.font_size', 0.5);
//     map.setFloat('variable.color_r', 1);
//     map.setFloat('variable.color_g', 0);
//     map.setFloat('variable.color_b', 1);
//     for (const player of world.getAllPlayers()) {
//         player.dimension.spawnParticle('xigmaguns:player_name_tag', Vector.add(player.getHeadLocation(), {x:0, y:2, z:0}), map);
//     }
// });
//# sourceMappingURL=test.js.map