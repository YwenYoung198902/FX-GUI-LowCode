import { Destroyable } from "./Destroyable";
import { Event } from "./pipe";
export declare type ObservableArrayChangeInfo<T> = {
    start: number;
    deleteCount: number;
    items: Readonly<T[]>;
};
export declare type ObservableArrayToChangeCallbackType<T> = (changeInfos: ObservableArrayChangeInfo<T>[], target: ObservableArray<T>) => void;
export declare type ObservableArrayChangedCallbackType<T> = (target: ObservableArray<T>) => void;
/**
 * 自研可观察数组，只监测数组本身，不检测数组下面对象的属性变化
 */
export declare class ObservableArray<T> extends Destroyable {
    _innerObj: T[];
    _toChangeEvent?: Event<Parameters<ObservableArrayToChangeCallbackType<T>>>;
    _changedEvent?: Event<Parameters<ObservableArrayChangedCallbackType<T>>>;
    constructor();
    get toChangeEvent(): Event<[ObservableArrayChangeInfo<T>[], ObservableArray<T>]>;
    get changedEvent(): Event<[ObservableArray<T>]>;
    _resetArray(array: T[]): void;
    /**
     * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
     * @param start The zero-based location in the array from which to start removing elements.
     * @param deleteCount The number of elements to remove.
     */
    splice(start: number, deleteCount?: number): T[];
    /**
     * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
     * @param start The zero-based location in the array from which to start removing elements.
     * @param deleteCount The number of elements to remove.
     * @param items Elements to insert into the array in place of the deleted elements.
     */
    splice(start: number, deleteCount: number, ...items: Readonly<T[]>): T[];
    /**
     * Removes the last element from an array and returns it.
     */
    pop(): T | undefined;
    /**
     * Appends new elements to an array, and returns the new length of the array.
     * @param items New elements of the Array.
     */
    push(...items: T[]): number;
    /**
     * Gets or sets the length of the array. This is a number one higher than the highest element defined in an array.
     */
    get length(): number;
    set length(value: number);
    get(index: number): T;
    set(index: number, value: T): void;
    indexOf(element: T): number;
    [Symbol.iterator](): IterableIterator<T>;
}
