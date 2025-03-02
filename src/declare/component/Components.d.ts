declare type ComponentDataType = {
    'header'?: IHeaderComponent;
    'item'?: IItemComponent;
    'magazine'?: IMagazineComponent;
    'timer'?: ITimerComponent[];
}

declare interface IHeaderComponent {
    name: string;
    description: string;
}

declare interface IItemComponent {
    typeId: string;
    amount: number;
    nametag: string;
    lore: string[];
}

declare interface IMagazineComponent {
    ammo: number;
    count: number;
}

declare interface ITimerComponent {
    duration: number;
    interval: number;
    tickFunction: (timer: number) => void;
}