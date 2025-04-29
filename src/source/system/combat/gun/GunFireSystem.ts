import { Player, world } from "@minecraft/server";
import { IEntity } from "../../../entity/Entity";

import { GunSystemManager } from "./GunSystemManager";
import { BulletHandler } from "../bullet/BulletHandler";
import { IntervalTask, TaskManager, TimeoutTask } from "../../TaskManager";
import { PlayerOffsetSystem } from "../PlayerOffsetSystem";
import { EntityManager } from "../../EntityManager";
import { GunFireAnimation } from "./animation/GunFireAnimation";

export class FullyAutoFire {
    
    readonly gun: IEntity;

    constructor(gun: IEntity) {
        this.gun = gun;
        this._addListener();
    }

    private _addListener() {
        const gunComponent = this.gun.getComponent('gun')!;
        if (gunComponent.releaseToFire) {
            world.afterEvents.itemReleaseUse.subscribe(ev => {
                if (ev.itemStack === undefined) return;
                const gunEntity = EntityManager.getEntity(ev.itemStack);
                if (gunEntity === undefined) return;
                if (gunEntity.uuid !== this.gun.uuid) return;    
                this.fire(ev.source);
            });
        }
        else {
            world.afterEvents.itemStartUse.subscribe(ev => {
                const gunEntity = EntityManager.getEntity(ev.itemStack);
                if (gunEntity === undefined) return;
                if (gunEntity.uuid !== this.gun.uuid) return;    
                this.fire(ev.source);
            });
        }
    }

    fire(owner: Player) {
        const gunComponent = this.gun.getComponent('gun')!;
        const magazineSystem = GunSystemManager.instance.get(this.gun.uuid)!.magazine;

        const taskId = TaskManager.executeTask(new IntervalTask({
            interval: gunComponent.fireRate,
            tickFunction: () => {
                if (magazineSystem.fireCheck()) {
                    const playerOffset = PlayerOffsetSystem.getOffset(owner);
                    for (let i = gunComponent.bulletSpread; i>0; i--) {
                        new BulletHandler(owner).launch(playerOffset);
                    }
                    GunFireAnimation.fireShacking(owner, 0.05);
                    return;
                }
            }
        }));

        (function() {
            const itemStopUse = world.afterEvents.itemStopUse.subscribe(ev => {
                if (ev.source.id === owner.id) {
                    world.afterEvents.itemStopUse.unsubscribe(itemStopUse);
                    interruption();
                }
            });
        
            const playerDie = world.afterEvents.entityDie.subscribe(ev => {
                if (ev.deadEntity.id === owner.id) {
                    world.afterEvents.entityDie.unsubscribe(playerDie);
                    interruption();
                }
            });

            const interruption = () => {
                TaskManager.removeTask(taskId);
            }
        })();

    }

}

export class SemiAutoFire {

    readonly gun: IEntity;
    private _cooldown: boolean = false;

    constructor(gun: IEntity) {
        this.gun = gun;
        this._addListener();
    }

    private _addListener() {
        const gunComponent = this.gun.getComponent('gun')!;
        if (gunComponent.releaseToFire) {
            world.afterEvents.itemReleaseUse.subscribe(ev => {
                if (ev.itemStack === undefined) return;
                const gunEntity = EntityManager.getEntity(ev.itemStack);
                if (gunEntity === undefined) return;
                if (gunEntity.uuid !== this.gun.uuid) return;
                this.fire(ev.source);
            });
        }
        else {
            world.afterEvents.itemStartUse.subscribe(ev => {
                const gunEntity = EntityManager.getEntity(ev.itemStack);
                if (gunEntity === undefined) return;
                if (gunEntity.uuid !== this.gun.uuid) return;
                this.fire(ev.source);
            });
        }
    }

    fire(owner: Player) {
        const gunComponent = this.gun.getComponent('gun')!;
        const magazineSystem = GunSystemManager.instance.get(this.gun.uuid)!.magazine;

        if (magazineSystem.fireCheck() && !this._cooldown) {
            
            const playerOffset = PlayerOffsetSystem.getOffset(owner);
            for (let i = gunComponent.bulletSpread; i>0; i--) {
                new BulletHandler(owner).launch(playerOffset);
            }
            this._cooldown = true;

            TaskManager.executeTask(new TimeoutTask({
                delay: gunComponent.fireRate,
                executeFunction: () => {
                    this._cooldown = false;
                }
            }));
        }
    }
}