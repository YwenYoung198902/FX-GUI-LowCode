import { Number16, Number3, Number4, Number9 } from '../Numbers';
/**
 * Computes the sum of two matrices.
 *
 * @param left The first matrix.
 * @param right The second matrix.
 * @param target The object onto which to store the result.
 * @returns The modified result parameter.
 */
export declare function _multiply(left: Readonly<Number16>, right: Readonly<Number16>, target?: Number16): Uint8Array | Float64Array | {
    0: number;
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    6: number;
    7: number;
    8: number;
    9: number;
    10: number;
    11: number;
    12: number;
    13: number;
    14: number;
    15: number;
    length: 16;
};
/**
 * Computes the product of two matrices assuming the matrices are
 * affine transformation matrices, where the upper left 3x3 elements
 * are a rotation matrix, and the upper three elements in the fourth
 * column are the translation.  The bottom row is assumed to be [0, 0, 0, 1].
 * The matrix is not verified to be in the proper form.
 * This method is faster than computing the product for general 4x4
 * matrices using {@link Matrix4.multiply}.
 *
 * @param left The first matrix.
 * @param right The second matrix.
 * @param target The object onto which to store the result.
 * @returns The modified result parameter.
 *
 * @example
 * const m1 = createNumber16(1.0, 6.0, 7.0, 0.0, 2.0, 5.0, 8.0, 0.0, 3.0, 4.0, 9.0, 0.0, 0.0, 0.0, 0.0, 1.0);
 * const m2 = mat4EastNorthUpToFixedFrame(createNumber3(1.0, 1.0, 1.0));
 * const m3 = mat4MultiplyTransformation(m1, m2, createNumbers(16));
 */
export declare function _multiplyTransformation(left: Readonly<Number16>, right: Readonly<Number16>, target?: Number16): Uint8Array | Float64Array | {
    0: number;
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    6: number;
    7: number;
    8: number;
    9: number;
    10: number;
    11: number;
    12: number;
    13: number;
    14: number;
    15: number;
    length: 16;
};
/**
* Multiplies a transformation matrix (with a bottom row of <code>[0.0, 0.0, 0.0, 1.0]</code>)
* by a 3x3 rotation matrix.  This is an optimization
* for <code>Matrix4.multiply(m, Matrix4.fromRotationTranslation(rotation), m);</code> with less allocations and arithmetic operations.
*
* @param matrix The matrix on the left-hand side.
* @param rotation The 3x3 rotation matrix on the right-hand side.
* @param target The object onto which to store the result.
* @returns The modified result parameter.
*
* @example
* // Instead of mat4Multiply(m, Cesium.Matrix4.fromRotationTranslation(rotation), m);
* mat4MultiplyByMatrix3(m, rotation, m);
*/
export declare function _multiplyByMatrix3(matrix: Readonly<Number16>, rotation: Readonly<Number9>, target?: Number16): Uint8Array | Float64Array | {
    0: number;
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    6: number;
    7: number;
    8: number;
    9: number;
    10: number;
    11: number;
    12: number;
    13: number;
    14: number;
    15: number;
    length: 16;
};
/**
 * Multiplies a transformation matrix (with a bottom row of <code>[0.0, 0.0, 0.0, 1.0]</code>)
 * by an implicit translation matrix defined by a {@link Number3}.  This is an optimization
 * for <code>matMultiply(m, Matrix4.fromTranslation(position), m);</code> with less allocations and arithmetic operations.
 *
 * @param matrix The matrix on the left-hand side.
 * @param translation The translation on the right-hand side.
 * @param target The object onto which to store the result.
 * @returns The modified result parameter.
 *
 * @example
 * // Instead of mat4Multiply(m, Matrix4.fromTranslation(position), m);
 * Matrix4.multiplyByTranslation(m, position, m);
 */
export declare function _multiplyByTranslation(matrix: Readonly<Number16>, translation: Readonly<Number3>, target?: Number16): Uint8Array | Float64Array | {
    0: number;
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    6: number;
    7: number;
    8: number;
    9: number;
    10: number;
    11: number;
    12: number;
    13: number;
    14: number;
    15: number;
    length: 16;
};
/**
 * Multiplies an affine transformation matrix (with a bottom row of <code>[0.0, 0.0, 0.0, 1.0]</code>)
 * by an implicit uniform scale matrix.  This is an optimization
 * for <code>Matrix4.multiply(m, Matrix4.fromUniformScale(scale), m);</code>, where
 * <code>m</code> must be an affine matrix.
 * This function performs fewer allocations and arithmetic operations.
 *
 * @param {Matrix4} matrix The affine matrix on the left-hand side.
 * @param {Number} scale The uniform scale on the right-hand side.
 * @param {Matrix4} result The object onto which to store the result.
 * @returns {Matrix4} The modified result parameter.
 *
 *
 * @example
 * // Instead of Cesium.Matrix4.multiply(m, Cesium.Matrix4.fromUniformScale(scale), m);
 * Cesium.Matrix4.multiplyByUniformScale(m, scale, m);
 *
 * @see Matrix4.fromUniformScale
 * @see Matrix4.multiplyByScale
 */
export declare function _multiplyByUniformScale(matrix: Readonly<Number16>, scale: number, target?: Number16): {
    0: number;
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    6: number;
    7: number;
    8: number;
    9: number;
    10: number;
    11: number;
    12: number;
    13: number;
    14: number;
    15: number;
    length: 16;
} | Readonly<Uint8Array> | Readonly<Float64Array>;
/**
 * Multiplies an affine transformation matrix (with a bottom row of <code>[0.0, 0.0, 0.0, 1.0]</code>)
 * by an implicit non-uniform scale matrix.  This is an optimization
 * for <code>Matrix4.multiply(m, Matrix4.fromUniformScale(scale), m);</code>, where
 * <code>m</code> must be an affine matrix.
 * This function performs fewer allocations and arithmetic operations.
 *
 * @param {Matrix4} matrix The affine matrix on the left-hand side.
 * @param {Cartesian3} scale The non-uniform scale on the right-hand side.
 * @param {Matrix4} result The object onto which to store the result.
 * @returns {Matrix4} The modified result parameter.
 *
 *
 * @example
 * // Instead of Cesium.Matrix4.multiply(m, Cesium.Matrix4.fromScale(scale), m);
 * Cesium.Matrix4.multiplyByScale(m, scale, m);
 *
 * @see Matrix4.fromScale
 * @see Matrix4.multiplyByUniformScale
 */
export declare function _multiplyByScale(matrix: Readonly<Number16>, scale: Readonly<Number3>, target?: Number16): {
    0: number;
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    6: number;
    7: number;
    8: number;
    9: number;
    10: number;
    11: number;
    12: number;
    13: number;
    14: number;
    15: number;
    length: 16;
} | Readonly<Uint8Array> | Readonly<Float64Array>;
/**
 * Computes the product of a matrix and a column vector.
 *
 * @param matrix The matrix.
 * @param cartesian The vector.
 * @param target The object onto which to store the result.
 * @returns The modified result parameter.
 */
export declare function _multiplyByVector(matrix: Readonly<Number16>, cartesian: Readonly<Number4>, target?: Number4): Uint8Array | Float64Array | {
    0: number;
    1: number;
    2: number;
    3: number;
    length: 4;
};
/**
 * Computes the product of a matrix and a {@link Cartesian3}.  This is equivalent to calling {@link Matrix4.multiplyByVector}
 * with a {@link Cartesian4} with a <code>w</code> component of zero.
 *
 * @param {Matrix4} matrix The matrix.
 * @param {Cartesian3} cartesian The point.
 * @param {Cartesian3} target The object onto which to store the result.
 * @returns {Cartesian3} The modified result parameter.
 *
 * @example
 * var p = new Cesium.Cartesian3(1.0, 2.0, 3.0);
 * var result = Cesium.Matrix4.multiplyByPointAsVector(matrix, p, new Cesium.Cartesian3());
 * // A shortcut for
 * //   Cartesian3 p = ...
 * //   Cesium.Matrix4.multiplyByVector(matrix, new Cesium.Cartesian4(p.x, p.y, p.z, 0.0), result);
 */
export declare function _multiplyByPointAsVector(matrix: Readonly<Number16>, cartesian: Readonly<Number3>, target?: Number3): Uint8Array | Float64Array | {
    0: number;
    1: number;
    2: number;
    length: 3;
};
/**
 * Computes the product of a matrix and a {@link Cartesian3}. This is equivalent to calling {@link Matrix4.multiplyByVector}
 * with a {@link Cartesian4} with a <code>w</code> component of 1, but returns a {@link Cartesian3} instead of a {@link Cartesian4}.
 *
 * @param {Matrix4} matrix The matrix.
 * @param {Cartesian3} cartesian The point.
 * @param {Cartesian3} target The object onto which to store the result.
 * @returns {Cartesian3} The modified result parameter.
 *
 * @example
 * var p = createNumber3(1.0, 2.0, 3.0);
 * var result = Matrix4.multiplyByPoint(matrix, p, new Cesium.Cartesian3());
 */
export declare function _affineMultiplyByPoint(matrix: Readonly<Number16>, cartesian: Readonly<Number3>, target?: Number3): Uint8Array | Float64Array | {
    0: number;
    1: number;
    2: number;
    length: 3;
};
export declare function _multiplyByPoint(matrix: Readonly<Number16>, cartesian: Readonly<Number3>, target?: Number3): Uint8Array | Float64Array | {
    0: number;
    1: number;
    2: number;
    length: 3;
};
export declare type ContinuousMultiplyOp<T> = (left: Number16, right: T, target: Number16) => Number16;
export declare function _continuousMultiply<T>(target: Number16, firstArg: Readonly<Number16>, ...args: Readonly<Number16 | [ContinuousMultiplyOp<T>, T]>[]): Number16;
