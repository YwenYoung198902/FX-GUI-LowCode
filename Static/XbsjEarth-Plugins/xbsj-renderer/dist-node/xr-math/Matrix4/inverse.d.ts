import { Number16 } from '../Numbers';
/**
 * Computes the inverse of the provided matrix using Cramers Rule.
 * If the determinant is zero, the matrix can not be inverted, and an exception is thrown.
 * If the matrix is an affine transformation matrix, it is more efficient
 * to invert it with {@link Matrix4.inverseTransformation}.
 *
 * @param {Matrix4} matrix The matrix to invert.
 * @param {Matrix4} target The object onto which to store the result.
 * @returns {Matrix4} The modified result parameter.
 *
 * @exception {RuntimeError} matrix is not invertible because its determinate is zero.
 */
export declare function inverse(matrix: Readonly<Number16>, target?: Number16): Uint8Array | Float64Array | {
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
