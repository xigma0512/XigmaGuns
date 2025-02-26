declare type ComponentDataType = {
    'xigmaguns:header'?: IHeaderComponent;
    'xigmaguns:item'?: IItemComponent;
    'xigmaguns:magazine'?: IMagazineComponent;
    'xigmaguns:timer'?: ITimerComponent;
}

declare interface IHeaderComponent {
    name: string;
    description: string[];
}

declare interface IItemComponent {
    typeId: string;
    amount: number;
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