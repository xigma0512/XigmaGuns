import { Entity } from "../../entity/Entity";

import { Player } from "@minecraft/server";
import { Vector3 } from "@minecraft/server";

export class DamageSystem {

    private _attacker: Player;
    private _target: Player;
    
    private _attackerTeam: number;
    private _targetTeam: number;

    constructor(attacker: Player, target: Player) {
        this._attacker = attacker;
        this._target = target;

        this._attackerTeam = attacker.getDynamicProperty('xigmaguns:team') as number;
        this._targetTeam = target.getDynamicProperty('xigmaguns:team') as number;
    }
    
    applyGunDamage(bulletEntity: Entity, hitLocation: Vector3) {
        if (this._attackerTeam === this._targetTeam) return;

        const bulletComp = bulletEntity.getComponent('bullet')!;
        const damageComp = bulletComp.damage;

        const hitType = this.getHitType(hitLocation, this._target);
        const damage = damageComp.getDamage(this.distance())[hitType];

        const healthComp = this._target.getComponent('health')!;
        let is_alive = true;
        if (healthComp.currentValue - damage > 0) {
            healthComp.setCurrentValue(healthComp.currentValue - damage);
        } else {
            is_alive = false;
        }
        
        this._target.setDynamicProperties({
            'xigmaguns:damage.attackerId': this._attacker.id,
            'xigmaguns:is_alive': is_alive
        });

        this._attacker.playSound('game.player.hurt');
        this._target.playSound('random.hurt');
    }

    private distance(): DistanceType {
        const attackLocation = this._attacker.location;
        const targetLocation = this._target.location;
        const [dx, dy, dz] = [
            attackLocation.x - targetLocation.x,
            attackLocation.y - targetLocation.y,
            attackLocation.z - targetLocation.z
        ];
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
    
        if (distance <= 15) return 'near';
        if (distance <= 30) return 'medium';
        return 'far';
    }

    private getHitType(hitLocation: Vector3, target: Player): BulletHitType {
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