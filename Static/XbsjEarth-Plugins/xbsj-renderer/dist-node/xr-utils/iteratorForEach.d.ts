/**
 * 迭代器的forEach, JS没有提供，这里写一下
 * @param 遍历器对象
 * @param (currentValue: number, currentIndex: number) => void
 *
 *
 */
export declare function forEach<T>(iteratorOrIterable: Iterable<T> | Iterator<T>, callbackfn: (currentValue: T, currentIndex: number) => void): void;
