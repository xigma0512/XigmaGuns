declare interface IntervalTaskData {
    readonly duration?: number;
    readonly interval?: number;
    readonly tickFunction: (t: number) => void;
}

declare interface TimeoutTaskData {
    readonly delay?: number;
    readonly executeFunction: () => void;
}