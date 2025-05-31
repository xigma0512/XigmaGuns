import { ComponentDataTypes } from "../../components/Component";

export namespace GunData {

    export const Glock17: ComponentDataTypes = {
        'item': {
            typeId: 'xigmaguns:glock17',
            amount: 1,
            nametag: 'Glock17',
            lore: [
                'lore1',
                'lore2'
            ]
        },
        'gun': {
            fireMode: 'semi-auto',
            bulletSpread: 7,
            releaseToFire: false,
            fireRate: 4,
            shackingLevel: 0.05,
            shackingDuration: 0.15,
            reload_time: 30
        },
        'offset': {
            hipfire: 4,
            movement: 2,
            scope: 0.1
        },
        'damage': {
            near: { head: 10, body: 5, legs: 3 },
            medium: { head: 8, body: 4, legs: 2 },
            far: { head: 6, body: 3, legs: 1 }
        },
        'magazine': {
            ammo: 9999999,
            count: 3,
        }
    }

    export const AWP: ComponentDataTypes = {
        'item': {
            typeId: 'minecraft:spyglass',
            amount: 1,
            nametag: 'AWP',
            lore: [
                'lore1',
                'lore2'
            ]
        },
        'gun': {
            fireMode: 'semi-auto',
            bulletSpread: 1,
            releaseToFire: true,
            fireRate: 4,
            shackingLevel: 0.05,
            shackingDuration: 0.15,
            reload_time: 30
        },
        'offset': {
            hipfire: 0.1,
            movement: 4,
            scope: 0.1
        },
        'damage': {
            near: { head: 99, body: 5, legs: 3 },
            medium: { head: 8, body: 4, legs: 2 },
            far: { head: 6, body: 3, legs: 1 }
        },
        'magazine': {
            ammo: 9999999,
            count: 3,
        }
    }
}