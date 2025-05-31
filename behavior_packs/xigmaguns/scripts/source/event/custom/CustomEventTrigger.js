import { system, world } from "@minecraft/server";
import { customEvents } from "./CustomEventManager";
import { PlayerChangeHotbarEvent } from "./PlayerChangeHotbar";
export class CustomEventTrigger {
    static triggers() {
        this.hotbarChange();
    }
    static hotbarChange() {
        const hotbarSelection = new Map();
        system.runInterval(() => {
            for (const player of world.getAllPlayers()) {
                if (hotbarSelection.get(player.id) !== undefined) {
                    const currentSelect = player.selectedSlotIndex;
                    const previousSelect = hotbarSelection.get(player.id);
                    if (currentSelect !== previousSelect) {
                        customEvents.playerChangeHotbar.trigger(PlayerChangeHotbarEvent.create(player, previousSelect, currentSelect));
                    }
                }
                hotbarSelection.set(player.id, player.selectedSlotIndex);
            }
        });
    }
}
//# sourceMappingURL=CustomEventTrigger.js.map