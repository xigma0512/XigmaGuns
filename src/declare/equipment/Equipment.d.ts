declare enum EquipmentTypes {
    Gun = 'Gun',
    Melee = 'Melee',
    Weapon = 'Weapon'
}

declare enum GunTypes {
    Glock17 = 'Glock17',
    Unknown = 'Unknown',
}

declare type EquipmentType = keyof typeof EquipmentTypes;
declare type GunType = keyof typeof GunTypes;

declare interface IGunData {
    components: {
        'xigmaguns:header': {
            name: GunType,
            description: string[]
        },
        'xigmaguns:item': {
            typeId: string,
            amount: number
        },
        'xigmaguns:magazine': {
            ammo: number,
            count: number
        }
    }
}