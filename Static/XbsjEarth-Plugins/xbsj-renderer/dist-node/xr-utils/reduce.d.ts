/**
 * 迭代器的reduce，JS没有提供，这里写一下
 * @param {*} iteratorOrIterable 遍历器对象
 * @param {*} callbackfn (previousValue: number, currentValue: number, currentIndex: number) => number
 * @param {number} initialValue 作为第一次调用 callback函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。
 */
export declare function reduce<T, AccumValueType = T>(iteratorOrIterable: Iterable<T> | Iterator<T>, callbackfn: (previousValue: AccumValueType, currentValue: T, currentIndex: number) => AccumValueType, initialValue: AccumValueType): AccumValueType;
