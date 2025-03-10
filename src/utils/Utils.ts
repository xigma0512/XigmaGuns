import { Player } from "@minecraft/server";

export class Utils {
    
    static randomUUID() {
        let d = new Date().getTime();
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    static applyDamage(target: Player, attacker: Player, damage: number) {
        target.setDynamicProperty('xigmaguns:damage.attacker', attacker.name);
        
        const health = target.getComponent('health');
        health?.setCurrentValue(health.currentValue - damage);
        if (target instanceof Player) target.playSound('random.hurt');
        attacker.playSound('game.player.hurt')
    }
}