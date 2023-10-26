import { Destroyable } from "../Destroyable";
import { ObservableArray } from "../ObservableArray";
import { Event } from "../pipe";
export declare class Channel extends Destroyable {
    private _animation;
    private _startTime;
    private _enabled;
    private _changedEvent?;
    constructor(startTime?: number, duration?: number);
    get changedEvent(): Event<[Channel]>;
    get animation(): Animation;
    set startTime(value: number);
    get startTime(): number;
    set enabled(value: boolean);
    get enabled(): boolean;
}
export declare class Animation extends Destroyable {
    private _duration;
    private _currentTime;
    private _name?;
    private _channels?;
    enterFunc?: (time: number) => void;
    leaveFunc?: (lastTime: number) => void;
    progressFunc?: (time: number, lastTime: number) => void;
    private _changedEvent?;
    constructor(duration?: number);
    get changedEvent(): Event<[Animation]>;
    get name(): string;
    set name(value: string);
    get hasChannels(): boolean;
    get channels(): ObservableArray<Channel>;
    set duration(value: number);
    get duration(): number;
    /**
     *
     * @param deep 为false时，不会遍历子节点的孙子节点
     */
    recomputeDurationFromChildren(deep?: boolean): void;
    valid(time?: number): boolean;
    set currentTime(value: number);
    get currentTime(): number;
}
export declare function destroyAnimationWithChildren(animation: Animation): void;
