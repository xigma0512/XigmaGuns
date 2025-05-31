import { InitSystem } from "../system/InitSystem";
import { ScriptCommandHandler } from "../commands/ScriptCommandHandler";
import { system, world } from "@minecraft/server";
import { Grenade } from "../system/combat/grenade/Grenade";
export class PermanentEvents {
    static register() {
        world.beforeEvents.itemUse.subscribe(ev => {
            if (ev.itemStack.hasTag('xigmaguns:grenade')) {
                ev.cancel = true;
                system.run(() => Grenade.throwing(ev.source, ev.itemStack));
            }
        });
        world.afterEvents.entitySpawn.subscribe(ev => {
            if (!ev.entity.isValid)
                return;
            const family = ev.entity.getComponent('type_family');
            if (family === undefined)
                return;
            if (family.hasTypeFamily('grenade') && !ev.entity.hasTag('rebound'))
                return new Grenade(ev.entity);
        });
        world.afterEvents.playerSpawn.subscribe(ev => {
            if (ev.initialSpawn)
                InitSystem.playerInit(ev.player);
        });
        system.afterEvents.scriptEventReceive.subscribe(ev => {
            ScriptCommandHandler.execute(ev);
        });
    }
}
//# sourceMappingURL=PermanentEvents.js.map