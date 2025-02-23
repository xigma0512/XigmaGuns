declare class EventHandler {
    subscribe(): void;
    unsubscribe(): void;
}

declare class EventSignal<E> {
    subscribe(callback: (arg: E) => void): (arg: E) => void;
    unsubscribe(callback: (arg: E) => void): void;
}