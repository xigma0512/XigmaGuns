import { system } from "@minecraft/server";
export class TaskManager {
    static _tasks = new Map;
    static executeTask(task) {
        const taskId = task.execute();
        this._tasks.set(taskId, task);
        return taskId;
    }
    static removeTask(taskId) {
        this._tasks.get(taskId)?.kill();
        this._tasks.delete(taskId);
    }
}
export class IntervalTask {
    _duration;
    _interval;
    _tickFunction;
    _timer = 0;
    _taskId = -1;
    constructor(DATA) {
        this._duration = DATA.duration ?? -1;
        this._interval = DATA.interval ?? 1;
        this._tickFunction = DATA.tickFunction;
    }
    execute() {
        this._tickFunction(this._timer);
        this._taskId = system.runInterval(() => {
            this._tickFunction(++this._timer);
            if (this._duration < 0)
                return;
            if (this._timer >= this._duration)
                TaskManager.removeTask(this._taskId);
        }, this._interval);
        return this._taskId;
    }
    kill() {
        system.clearRun(this._taskId);
    }
}
export class TimeoutTask {
    _delay;
    _executeFunction;
    _taskId = -1;
    constructor(DATA) {
        this._delay = DATA.delay ?? 1;
        this._executeFunction = DATA.executeFunction;
    }
    execute() {
        this._taskId = system.runTimeout(() => {
            this._executeFunction();
            TaskManager.removeTask(this._taskId);
        }, this._delay);
        return this._taskId;
    }
    kill() {
        system.clearRun(this._taskId);
    }
}
//# sourceMappingURL=TaskManager.js.map