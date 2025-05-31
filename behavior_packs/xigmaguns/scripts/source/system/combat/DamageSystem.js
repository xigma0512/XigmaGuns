import { Vector } from "../../../utils/Vector";
import { scoreboard_property } from "../../../utils/Property";
import { Player } from "@minecraft/server";
export class DamageSystem {
    _attacker;
    _target;
    _attackerTeam;
    _targetTeam;
    constructor(attacker, target) {
        this._attacker = attacker;
        this._target = target;
        this._attackerTeam = scoreboard_property(this._attacker, 'team');
        this._targetTeam = scoreboard_property(this._target, 'team');
    }
    applyGunDamage(bulletEntity, hitLocation) {
        if (this._attackerTeam === this._targetTeam)
            return;
        const bulletComp = bulletEntity.getComponent('bullet');
        const damageComp = bulletComp.damage;
        const hitType = this.getHitType(hitLocation, this._target);
        const damage = damageComp[this.distance()][hitType];
        const healthComp = this._target.getComponent('health');
        if (healthComp.currentValue - damage > 0) {
            healthComp.setCurrentValue(healthComp.currentValue - damage);
        }
        else {
            this._target.runCommand(`scriptevent xf:shot_death ${this._attacker.id}`);
        }
        this._attacker.playSound('game.player.hurt');
        if (this._target instanceof Player)
            this._target.playSound('random.hurt');
    }
    distance() {
        const distance = Vector.distance(this._attacker.location, this._target.location);
        if (distance <= 15)
            return 'near';
        if (distance <= 30)
            return 'medium';
        return 'far';
    }
    getHitType(hitLocation, target) {
        if (!(target instanceof Player))
            return 'head';
        const targetPosition = target.location;
        const distance = {
            x: Math.abs(hitLocation.x - targetPosition.x),
            y: hitLocation.y - targetPosition.y,
            z: Math.abs(hitLocation.z - targetPosition.z)
        };
        if (Math.abs(distance.y) <= 0.85)
            return 'legs';
        if (Math.abs(distance.y) <= 1.45)
            return 'body';
        return 'head';
    }
}
//# sourceMappingURL=DamageSystem.js.map