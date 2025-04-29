import { Player } from "@minecraft/server";

export class GunFireAnimation {
    static fireShacking(target: Player, level: number) {
        target.runCommand(`camerashake add @s ${level} 0.15 rotational`);
    }
}