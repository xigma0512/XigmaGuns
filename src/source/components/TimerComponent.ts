import { system } from "@minecraft/server";
import { Component } from "./Component";

export class TimerComponent extends Component {

    readonly duration: number;
    readonly interval: number;
    readonly tickFunction: (t: number) => void;
    
    private _timer = 0;
    private _taskId = -1;

    constructor(duration: number, interval: number, tickFunction: (timer: number) => void) {
        super('timer');

        this.duration = duration;
        this.interval = interval;
        this.tickFunction = tickFunction;
    }

    get taskId() { return this._taskId; }

    execute() {
        this._taskId = system.runInterval(() => {
                this.tickFunction(this._timer++);
                if (this._timer === this.duration) this.kill();
            }, this.interval);
    }

    kill() {
        system.clearRun(this._taskId);
    }

}