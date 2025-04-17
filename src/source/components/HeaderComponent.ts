import { Component } from "./Component";

export interface IHeaderComponent {
    readonly name: string;
    readonly description: string;
}

export class HeaderComponent extends Component {

    readonly name: string;
    readonly description: string;

    constructor(data?: IHeaderComponent) {
        super('header');

        this.name = data?.name ?? 'unknown';
        this.description = data?.description ?? '';
    }
}