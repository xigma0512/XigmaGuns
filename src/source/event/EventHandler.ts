interface EventSignal<E> {
    subscribe(callback: (event: E) => void): (arg: E) => void;
    unsubscribe(callback: (arg: E) => void): void;
}

export class EventHandler<E, S extends EventSignal<E>> {

    private readonly _SIGNAL: S;
    private readonly executeFunction: (event: E) => void; 
    private _callback: ((arg: E) => void);

    constructor(signal: S, func: (event: E) => void) {
        this._SIGNAL = signal;
        this.executeFunction = func;
        this._callback = this._SIGNAL.subscribe(this.executeFunction)
    }

    unsubscribe() {
        this._SIGNAL.unsubscribe(this._callback);
    }

}