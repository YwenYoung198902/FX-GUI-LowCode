import { Destroyable } from "./Destroyable";
import { Event } from "./pipe/Event";
import { Timing } from "./Timing";
export declare class Transition extends Destroyable {
    private _duration;
    _target: 0 | 1;
    _current: number;
    _start: number;
    _timing: Timing;
    _currentChanged?: Event<[0 | 1, number]>;
    constructor(_duration: number);
    reset(start: 0 | 1, current?: number): void;
    set target(value: 0 | 1);
    get target(): 0 | 1;
    get current(): number;
    get currentChanged(): Event<[0 | 1, number]>;
}
