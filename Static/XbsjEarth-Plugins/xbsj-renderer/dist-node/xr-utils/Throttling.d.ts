import { Processing } from './Processings/Processing';
export declare class Throttling<LastDebounceValue extends any[] = []> extends Processing<void, [LastDebounceValue, number]> {
    private _delayTime;
    _lastThrottleValue?: LastDebounceValue;
    _throttleTimes: number;
    _d?: () => void;
    constructor(_delayTime?: number);
    get delayTime(): number;
    do(...value: LastDebounceValue): void;
}
