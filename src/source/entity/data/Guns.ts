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
            fireRate: 4,
            reload_time: 30
        },
        'offset': {
            hippie: 10,
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
}