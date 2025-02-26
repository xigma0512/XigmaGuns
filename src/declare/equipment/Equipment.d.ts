declare enum EquipmentTypes {
    Gun = 'Gun',
    Melee = 'Melee',
    Throwable = 'Throwable'
}

declare enum GunTypes {
    Glock17 = 'Glock17',
    Unknown = 'Unknown',
}

declare type EquipmentType = keyof typeof EquipmentTypes;
declare type GunType = keyof typeof GunTypes;