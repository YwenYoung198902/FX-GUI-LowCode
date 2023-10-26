export declare function defaultLerpFunc(left: number, right: number, ratio: number): number;
/**
 *
 * @param ratio
 * @param ratioValues 假定已经排序，但是需要考虑可能存在同一个ratio的两个Value
 *
 * @example
 * const x0 = getValueFromRatio(0.3, [{ ratio: 0.2, value: 2 }, { ratio: 0.6, value: 6 }], (a, b, ratio) => (1 - ratio) * a + ratio * b); // 3
 * const x1 = getValueFromRatio(0.1, [{ ratio: 0.2, value: 2 }, { ratio: 0.6, value: 6 }], (a, b, ratio) => (1 - ratio) * a + ratio * b); // 2
 * const x2 = getValueFromRatio(0.7, [{ ratio: 0.2, value: 2 }, { ratio: 0.6, value: 6 }], (a, b, ratio) => (1 - ratio) * a + ratio * b); // 6
 * const x3 = getValueFromRatio(0.3, [{ ratio: 0.2, value: [2, 20] }, { ratio: 0.6, value: [6, 60] }], (a, b, ratio, t) => Vector.lerp(a, b, ratio, t), (v, t) => (t = t || [0, 0], Vector.clone(v, t)));
 * const x4 = getValueFromRatio(0.1, [{ ratio: 0.2, value: [2, 20] }, { ratio: 0.6, value: [6, 60] }], (a, b, ratio, t) => Vector.lerp(a, b, ratio, t), (v, t) => (t = t || [0, 0], Vector.clone(v, t)));
 * const x5 = getValueFromRatio(0.7, [{ ratio: 0.2, value: [2, 20] }, { ratio: 0.6, value: [6, 60] }], (a, b, ratio, t) => Vector.lerp(a, b, ratio, t), (v, t) => (t = t || [0, 0], Vector.clone(v, t)));

 * class XX {
 *     constructor(private _data: [number, number, number][]) {}
 *     *[Symbol.iterator]() {
 *         for (let e of this._data) {
 *             yield {
 *                 ratio: e[0],
 *                 value: [e[1], e[2]]
 *             };
 *         }
 *     }
 * }
 * const x6 = getValueFromRatio(0.3, new XX([[0.2, 2, 20], [0.6, 6, 60]]), (a, b, ratio, t) => Vector.lerp(a, b, ratio, t), (v, t) => (t = t || [0, 0], Vector.clone(v, t)));
 * const x7 = getValueFromRatio(0.1, new XX([[0.2, 2, 20], [0.6, 6, 60]]), (a, b, ratio, t) => Vector.lerp(a, b, ratio, t), (v, t) => (t = t || [0, 0], Vector.clone(v, t)));
 * const x8 = getValueFromRatio(0.7, new XX([[0.2, 2, 20], [0.6, 6, 60]]), (a, b, ratio, t) => Vector.lerp(a, b, ratio, t), (v, t) => (t = t || [0, 0], Vector.clone(v, t)));

 * function *myIterator(array: [number, number, number][]) {
 *     for (let e of array) {
 *         yield {
 *             ratio: e[0],
 *             value: [e[1], e[2]]
 *         };
 *     }
 * }
 * const x9 = getValueFromRatio(0.3, myIterator([[0.2, 2, 20], [0.6, 6, 60]]), (a, b, ratio, t) => Vector.lerp(a, b, ratio, t), (v, t) => (t = t || [0, 0], Vector.clone(v, t)));
 * const x10 = getValueFromRatio(0.1, myIterator([[0.2, 2, 20], [0.6, 6, 60]]), (a, b, ratio, t) => Vector.lerp(a, b, ratio, t), (v, t) => (t = t || [0, 0], Vector.clone(v, t)));
 * const x11 = getValueFromRatio(0.7, myIterator([[0.2, 2, 20], [0.6, 6, 60]]), (a, b, ratio, t) => Vector.lerp(a, b, ratio, t), (v, t) => (t = t || [0, 0], Vector.clone(v, t)));
 *
 * console.log(`x: ${[x0, x1, x2, x3, x4, x5, x6, x7, x8].toString}`);
 */
export declare function getValueFromRatio<T>(ratio: number, ratioValues: Iterable<{
    ratio: number;
    value: T;
}> | Iterator<{
    ratio: number;
    value: T;
}>, lerpFunc: (left: T, right: T, ratio: number, target?: T) => T, cloneFunc?: (value: T, target?: T) => T, target?: T): T | undefined;
