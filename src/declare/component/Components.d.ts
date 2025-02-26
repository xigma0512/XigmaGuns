declare type ComponentDataType = {
    'xigmaguns:header'?: IHeaderComponent;
    'xigmaguns:item'?: IItemComponent;
    'xigmaguns:magazine'?: IMagazineComponent;
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