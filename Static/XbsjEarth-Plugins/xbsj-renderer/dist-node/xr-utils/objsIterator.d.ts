/**
 * 对象数组的迭代器
 * @param objIteratorOrIterable
 * @param props
 * @example
 * var objs = [{x: 1}, {x: 2}];
 * var objsItr = objsIterator<number>(objs, ['x']);
 *
 * // example1
 * for (let d of objsItr) {
 *     console.log(d);
 * }
 *
 * // example2
 * var m = min(objsItr);
 *
 * // example3
 * const externalData = [{x:1}, {x:1}, {x:1}, {x:1}, {x:1}, {x:1}, {x:1}, {x:1}, {x:1}];
 * const externalIterator = objsIterator(externalData, ['x']);
 * for (let e of externalIterator) { console.log(e) };
 *
 * // example4
 * const externalData2 = [{ c: {x:1, y:2, z: 3} }, { c: {x: 4, y: 5, z: 6} }, { c: {x: 7, y: 8, z: 9} }];
 * function* g() {
 *     const oi = objsIterator(externalData2, ['c']);
 *     for (let e of oi) {
 *         yield e.x;
 *         yield e.y;
 *         yield e.z;
 *     }
 * }
 * const externalIterator2 = g();
 * for (let e of externalIterator) { console.log(e) };
 */
export declare function objsIterator<T = any>(objIteratorOrIterable: Iterable<{
    [k: string]: any;
}> | Iterator<{
    [k: string]: any;
}>, props: string[]): Generator<T, void, unknown>;
