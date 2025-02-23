export class BaseEventHandler<E, S extends EventSignal<E>> {
    
    constructor(        
        protected readonly _SIGNAL: S,
        protected _callback: ((arg: E) => void) | undefined = undefined
    ) { }

    unsubscribe() {
        if (this._callback === undefined) return;
        this._SIGNAL.unsubscribe(this._callback);
        this._callback = undefined;
    }

}