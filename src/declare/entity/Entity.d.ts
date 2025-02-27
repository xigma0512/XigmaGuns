declare interface EntityTypes {
    Gun: 'Gun';
    Throwable: 'Throwable';
    Melee: 'Melee';
}

declare type EntityType = keyof EntityTypes;