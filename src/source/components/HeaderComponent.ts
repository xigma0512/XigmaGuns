import { Component } from "./Component";

export class HeaderComponent extends Component {

    readonly name: string;
    readonly description: string[];

    constructor(name: string = 'unknown', description: string[] = []) {
        super('header');

        this.name = name;
        this.description = description;
    }
}