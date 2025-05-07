import { IElement } from "../../element/Element";
import { Vector } from "../../../utils/Vector";
import { scoreboard_property, set_scoreboard_property } from "../../../utils/Property";

import { Player, Entity, GameMode } from "@minecraft/server";
import { Vector3 } from "@minecraft/server";

export class DamageSystem {

    private _attacker: Player;
    private _target: Entity;
    
    private _attackerTeam: number;
    private _targetTeam: number;

    constructor(attacker: Player, target: Entity) {
        this._attacker = attacker;
        this._target = target;

        this._attackerTeam = scoreboard_property(this._attacker, 'team');
        this._targetTeam = scoreboard_property(this._target, 'team');
    }
    
    applyGunDamage(bulletEntity: IElement, hitLocation: Vector3) {
        if (this._attackerTeam === this._targetTeam) return;

        const bulletComp = bulletEntity.getComponent('bullet')!;
        const damageComp = bulletComp.damage;

        const hitType = this.getHitType(hitLocation, this._target);
        const damage = damageComp[this.distance()][hitType];

        const healthComp = this._target.getComponent('health')!;
        if (healthComp.currentValue - damage > 0) {
            healthComp.setCurrentValue(healthComp.currentValue - damage);
        } else {
            this._target.runCommand(`scriptevent xf:shot_death ${this._attacker.id}`);
        }

        this._attacker.playSound('game.player.hurt');
        if (this._target instanceof Player) this._target.playSound('random.hurt');
    }

    private distance(): DistanceType {

        const distance = Vector.distance(this._attacker.location, this._target.location);
    
        if (distance <= 15) return 'near';
        if (distance <= 30) return 'medium';
        return 'far';
    }

    private getHitType(hitLocation: Vector3, target: Entity): BulletHitType {
        if (!(target instanceof Player)) return 'head';
        const targetPosition = target.location;

        const distance = {
            x: Math.abs(hitLocation.x - targetPosition.x),
            y: hitLocation.y - targetPosition.y,
            z: Math.abs(hitLocation.z - targetPosition.z)
        }

        if (Math.abs(distance.y) <= 0.85) return 'legs';
        if (Math.abs(distance.y) <= 1.45) return 'body';
        return 'head';
    }

}