import { system } from "@minecraft/server";

declare interface ITask {
    execute(): number;
    kill(): void;
}

export class TaskManager {

    private static _tasks = new Map<number, ITask>;
    
    static executeTask(task: ITask) {
        const taskId = task.execute();
        this._tasks.set(taskId, task);
        return taskId;
    }

    static removeTask(taskId: number) {
        this._tasks.get(taskId)?.kill();
    }

}

export class IntervalTask {

    private readonly _duration: number;
    private readonly _interval: number;
    private readonly _tickFunction: (t: number) => void;

    private _timer: number = 0;
    private _taskId: number = 0;

    constructor(DATA: IntervalTaskData) {
        this._duration = DATA.duration;
        this._interval = DATA.interval;
        this._tickFunction = DATA.tickFunction;
    }

    execute() {
        this._tickFunction(this._timer);
        this._taskId = system.runInterval(() => {
            this._tickFunction(++this._timer);
            if (this._timer >= this._duration) TaskManager.removeTask(this._taskId);
        }, this._interval);

        return this._taskId;
    }

    kill() {
        system.clearRun(this._taskId);
    }

}