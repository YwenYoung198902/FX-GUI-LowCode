import { Event } from './pipe/Event';
import { Processing } from './Processings/Processing';
export declare class Interval extends Processing<void> {
    _intervalID?: ReturnType<typeof setInterval>;
    _intervalFunc?: (value: void) => void;
    constructor(intervalTime: number, leading?: boolean);
}
export interface Interval {
    leading: boolean;
    leadingChanged: Event<[boolean, boolean]>;
}
export interface Interval {
    intervalTime: number;
    intervalTimeChanged: Event<[number, number]>;
}
