console.log = (...data: any[]) => {
    world.sendMessage(JSON.stringify(data));
}

import { system, world } from "@minecraft/server";
import { EntityManager } from "../source/system/EntityManager";
import { Glock17 } from "../source/entity/Glock17";
world.afterEvents.chatSend.subscribe(ev => {
    const glock = new Glock17;
    EntityManager.registerEntity(glock, glock.getComponent('item')!.item);
    ev.sender.getComponent('inventory')?.container?.addItem(glock.getComponent('item')!.item);
    ev.sender.setDynamicProperty('xigmaguns:team', 1)
});

system.runInterval(() => {
    world.getAllPlayers().forEach(player => {
        player.onScreenDisplay.setActionBar(JSON.stringify(player.getDynamicProperty('xigmaguns:offset')));
    })
})