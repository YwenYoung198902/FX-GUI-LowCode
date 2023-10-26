import { Processing } from "./Processings/Processing";
/**
 * Debouncing
 *
 * @example
 * const hideHoverDivDebouncing = this.disposeVar(new Debouncing(800));
 * hideHoverDivDebouncing.progressFunc = () => {
 *     console.log('hideHoverDiv');
 *     hideHoverDivFunc();
 * }
 * hideHoverDivDebouncing.restart();
 * hideHoverDivDebouncing.debounce();
 */
export declare class Debouncing<LastDebounceValue extends any[] = []> extends Processing<void, [LastDebounceValue, number]> {
    private _delayTime;
    _lastDebounceValue?: LastDebounceValue;
    _debouncTimes: number;
    _d?: () => void;
    constructor(_delayTime?: number);
    get delayTime(): number;
    debounce(...value: LastDebounceValue): void;
}
