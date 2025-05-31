export class GunFireAnimation {
    static fireShacking(target, level, duration) {
        target.runCommand(`camerashake add @s ${level} ${duration} rotational`);
    }
}
//# sourceMappingURL=GunFireAnimation.js.map