import { system, world } from "@minecraft/server";
import { customEvents } from "./CustomEventManager";
import { PlayerChangeHotbarEvent } from "./PlayerChangeHotbar";

export class CustomEventTrigger {

    static triggers() {
        this.hotbarChange();
    }

    private static hotbarChange() {
        const hotbarSelection = new Map<string, number>();
        const taskIds = new Map<string, number>();

        world.afterEvents.playerSpawn.subscribe(ev => {
            if (!ev.initialSpawn) return;
            taskIds.set(ev.player.id, system.runInterval(() => {
                if (hotbarSelection.get(ev.player.id) !== undefined) {
                    const currentSelect = ev.player.selectedSlotIndex;
                    const previousSelect = hotbarSelection.get(ev.player.id)!;
                    if (currentSelect !== previousSelect) {
                        customEvents.playerChangeHotbar.trigger(PlayerChangeHotbarEvent.create(ev.player, previousSelect, currentSelect));
                    }
                }
                hotbarSelection.set(ev.player.id, ev.player.selectedSlotIndex);
            }));
        });

        world.afterEvents.playerLeave.subscribe(ev => {
            const id = taskIds.get(ev.playerId);
            if (id === undefined) return;
            system.clearRun(id);
        });
    }
}