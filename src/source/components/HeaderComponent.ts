import { Component } from "./Component";

export class HeaderComponent extends Component {

    readonly name: string;
    readonly description: string;

    constructor(data: IHeaderComponent | undefined) {
        super('header');

        this.name = data?.name ?? 'unknown';
        this.description = data?.description ?? '';
    }
}