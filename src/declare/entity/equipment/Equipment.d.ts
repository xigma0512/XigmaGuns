declare type EquipmentType = keyof Pick<EntityTypes, 'Gun' | 'Melee' | 'Throwable'>;

declare interface GunTypes {
    Glock17: 'Glock17',
    Unknown: 'Unknown',
}

declare type GunType = keyof GunTypes;