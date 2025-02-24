declare enum WeaponTypes {
    Gun = 'Gun',
    Melee = 'Melee',
    Equipment = 'Equipment'
}

declare enum GunTypes {
    Glock17 = 'Glock17',
    Unknown = 'Unknown',
}

declare type WeaponType = keyof typeof WeaponTypes;
declare type GunType = keyof typeof GunTypes;

declare interface IGunData {
    components: {
        'weapon:header': {
            name: GunType,
            description: string[]
        },
        'weapon:item': {
            typeId: string,
            amount: number
        },
        'weapon:magazine': {
            ammo: number,
            count: number
        }
    }
}