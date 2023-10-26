/**
 * 获取一个数组或者迭代器中的最大值，注意元素类型必须是数值
 * @param iteratorOrIterable
 * @example
 * // example1
 * var m = max([1, 2, 3]);
 *
 * // example2
 * var objs = [{x: 1}, {x: 2}];
 * var objsItr = objsIterator<number>(objs, ['x']);
 * for (let d of objsItr) {
 *     console.log(d);
 * }
 * var m2 = max(objsItr);
 */
export declare function max(iteratorOrIterable: Iterable<number> | Iterator<number>): number;
/**
 * 获取一个数组或者迭代器中的最小值，注意元素类型必须是数值
 * @param iteratorOrIterable
 * @example
 * // example1
 * var m = max([1, 2, 3]);
 *
 * // example2
 * var objs = [{x: 1}, {x: 2}];
 * var objsItr = objsIterator<number>(objs, ['x']);
 * for (let d of objsItr) {
 *     console.log(d);
 * }
 * var m2 = min(objsItr);
 */
export declare function min(iteratorOrIterable: Iterable<number> | Iterator<number>): number;
