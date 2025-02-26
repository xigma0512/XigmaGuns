import { system } from "@minecraft/server";
import { Component } from "./Component";

export class TimerComponent extends Component {

    readonly duration: number;
    readonly interval: number;
    readonly tickFunction: (t: number) => void;

    private timer = 0;
    private taskId = -1;

    constructor(duration: number, interval: number, tickFunction: (timer: number) => void) {
        super('xigmaguns:timer');

        this.duration = duration;
        this.interval = interval;
        this.tickFunction = tickFunction;
    }

    execute() {
        this.taskId = system.runInterval(() => {
                this.tickFunction(this.timer++);
                if (this.timer === this.duration) this.kill();
            }, this.interval);
    }

    kill() {
        system.clearRun(this.taskId);
    }

}