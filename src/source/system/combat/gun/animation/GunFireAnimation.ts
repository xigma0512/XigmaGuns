import { Player } from "@minecraft/server";

export class GunFireAnimation {
    static fireShacking(target: Player, level: number, duration: number) {
        target.runCommand(`camerashake add @s ${level} ${duration} rotational`);
    }
}