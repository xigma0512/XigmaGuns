import { system } from "@minecraft/server";
import { Component } from "./Component";

export class TimerComponent extends Component {

    readonly duration: number;
    readonly interval: number;
    readonly tickFunction: (t: number) => void;
    
    private _timer = 0;
    private _taskId = -1;

    constructor(data: ITimerComponent | undefined) {
        super('timer');

        this.duration = data?.duration ?? 20;
        this.interval = data?.interval ?? 1;
        this.tickFunction = data?.tickFunction ?? function(){};
    }

    get taskId() { return this._taskId; }

    execute() {
        this.tickFunction(this._timer);
        this._taskId = system.runInterval(() => {
                this.tickFunction(this._timer++);
                if (this._timer === this.duration) this.kill();
            }, this.interval);
        return this._taskId;
    }

    kill() {
        system.clearRun(this._taskId);
    }

}