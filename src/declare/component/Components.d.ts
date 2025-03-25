declare type ComponentDataType = {
    'header'?: IHeaderComponent;
    'item'?: IItemComponent;
    'magazine'?: IMagazineComponent;
    'position'?: IPositionComponent;
    'gun'?: IGunComponent;
    'bullet'?: IBulletComponent;
    'damage'?: IDamageComponent;
    'shot_offset'?: IShotOffsetComponent;
}

declare interface IHeaderComponent {
    readonly name: string;
    readonly description: string;
}

declare interface IItemComponent {
    readonly typeId: string;
    readonly amount: number;
    readonly nametag: string;
    readonly lore: string[];
}

declare interface IMagazineComponent {
    readonly ammo: number;
    readonly count: number;
}

declare interface IPositionComponent {
    x: number;
    y: number;
    z: number;
    dimension: string;
}

declare interface IGunComponent {
    readonly fireRate: number;
    readonly reload_time: number;
}

declare interface IBulletComponent { }

declare interface IDamageComponent {
    readonly near: DamageType;
    readonly medium: DamageType;
    readonly far: DamageType;
}

declare interface IShotOffsetComponent {
    readonly upper_limit: number;
    readonly lower_limit: number;
    readonly value: number;
}