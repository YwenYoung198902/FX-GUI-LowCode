import { Number16, Number3 } from "../Numbers";
/**
 * Extracts the non-uniform scale assuming the matrix is an affine transformation.
 *
 * @param {Matrix4} matrix The matrix.
 * @param {Cartesian3} target The object onto which to store the result.
 * @returns {Cartesian3} The modified result parameter
 */
export declare function _getScale(matrix: Readonly<Number16>, target?: Number3): Uint8Array | Float64Array | {
    0: number;
    1: number;
    2: number;
    length: 3;
};
/**
 * Computes a new matrix that replaces the scale with the provided scale.  This assumes the matrix is an affine transformation
 *
 * @param {Matrix4} matrix The matrix to use.
 * @param {Cartesian3} scale The scale that replaces the scale of the provided matrix.
 * @param {Matrix4} result The object onto which to store the result.
 * @returns {Matrix4} The modified result parameter.
 */
export declare function _setScale(matrix: Readonly<Number16>, scale: Readonly<Number3>, result?: Number16): {
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
 * Computes the maximum scale assuming the matrix is an affine transformation.
 * The maximum scale is the maximum length of the column vectors in the upper-left
 * 3x3 matrix.
 *
 * @param {Matrix4} matrix The matrix.
 * @returns {Number} The maximum scale.
 */
export declare function _getMaximumScale(matrix: Readonly<Number16>): number;
