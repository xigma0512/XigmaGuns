declare type ComponentDataType = {
    'header'?: IHeaderComponent;
    'item'?: IItemComponent;
    'magazine'?: IMagazineComponent;
    'timer'?: ITimerComponent[];
    'particle'?: IParticleComponent;
    'position'?: IPositionComponent;
    'vector'?: IVectorComponent;
    'gun'?: IGunComponent;
    'bullet'?: IBulletComponent;
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

declare interface ITimerComponent {
    readonly duration: number;
    readonly interval: number;
    readonly tickFunction: (timer: number) => void;
}

declare interface IParticleComponent {
    readonly typeId: string;
    readonly interval: number;
    readonly duration: number;
}

declare interface IPositionComponent {
    x: number;
    y: number;
    z: number;
    dimension: string;
}

declare interface IVectorComponent {
    readonly x: number;
    readonly y: number;
    readonly z: number;
}

declare interface IGunComponent {
    readonly damage: number;
    readonly range: number;
    readonly fireRate: number;
}

declare interface IBulletComponent { }