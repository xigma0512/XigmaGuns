import { Entity as mcEntity, Player } from "@minecraft/server";
import { Entity } from "../../entity/Entity";

export class DamageSystem {

    private _attacker: Player;
    private _target: mcEntity;
    private _attackerTeam: number;
    private _targetTeam: number;

    constructor(attacker: Player, target: mcEntity) {
        this._attacker = attacker;
        this._target = target;
        this._attackerTeam = attacker.getDynamicProperty('xigmaguns:team') as number;
        this._targetTeam = target.getDynamicProperty('xigmaguns:team') as number;
    }
    
    applyGunDamage(bulletEntity: Entity, hitType: BulletHitType) {
        if (this._attackerTeam === this._targetTeam) return;

        const bulletComp = bulletEntity.getComponent('bullet')!;
        const damageComp = bulletComp.damage;
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
        if (this._target instanceof Player) this._target.playSound('random.hurt');
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

}