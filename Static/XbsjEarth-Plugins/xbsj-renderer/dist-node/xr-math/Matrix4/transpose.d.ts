import { Number16 } from '../Numbers';
/**
 * Computes the transpose of the provided matrix.
 *
 * @param {Matrix4} matrix The matrix to transpose.
 * @param {Matrix4} target The object onto which to store the result.
 * @returns {Matrix4} The modified result parameter.
 *
 * @example
 * //returns transpose of a Matrix4
 * // m = [10.0, 11.0, 12.0, 13.0]
 * //     [14.0, 15.0, 16.0, 17.0]
 * //     [18.0, 19.0, 20.0, 21.0]
 * //     [22.0, 23.0, 24.0, 25.0]
 *
 * var a = Cesium.Matrix4.transpose(m, new Cesium.Matrix4());
 *
 * // m remains the same
 * // a = [10.0, 14.0, 18.0, 22.0]
 * //     [11.0, 15.0, 19.0, 23.0]
 * //     [12.0, 16.0, 20.0, 24.0]
 * //     [13.0, 17.0, 21.0, 25.0]
 */
export declare function _transpose(matrix: Readonly<Number16>, target?: Number16): Uint8Array | Float64Array | {
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
