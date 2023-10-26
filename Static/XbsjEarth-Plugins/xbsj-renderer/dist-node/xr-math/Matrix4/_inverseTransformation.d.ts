import { Number16 } from '../Numbers';
/**
 * Computes the inverse of the provided matrix assuming it is
 * an affine transformation matrix, where the upper left 3x3 elements
 * are a rotation matrix, and the upper three elements in the fourth
 * column are the translation.  The bottom row is assumed to be [0, 0, 0, 1].
 * The matrix is not verified to be in the proper form.
 * This method is faster than computing the inverse for a general 4x4
 * matrix using {@link Matrix4.inverse}.
 *
 * @param {Matrix4} matrix The matrix to invert.
 * @param {Matrix4} target The object onto which to store the result.
 * @returns {Matrix4} The modified result parameter.
 */
export declare function _inverseTransformation(matrix: Readonly<Number16>, target?: Number16): Uint8Array | Float64Array | {
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
