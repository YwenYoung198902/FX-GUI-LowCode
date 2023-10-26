import { Number16, Number3, Number4, Number9 } from "./Numbers";
export declare namespace Quaternion {
    /**
     * Computes a quaternion representing a rotation around an axis.
     *
     * @param {Cartesian3} axis The axis of rotation.
     * @param {Number} angle The angle in radians to rotate around the axis.
     * @param {Quaternion} [target] The object onto which to store the result.
     * @returns {Quaternion} The modified result parameter or a new Quaternion instance if one was not provided.
     */
    function fromAxisAngle(axis: Readonly<Number3>, angle: number, target?: Number4): Uint8Array | Float64Array | {
        0: number;
        1: number;
        2: number;
        /**
         * Computes a Quaternion from the provided Matrix3 instance.
         *
         * @param {Matrix3} matrix3 The rotation matrix.
         * @param {Quaternion} [result] The object onto which to store the result.
         * @returns {Quaternion} The modified result parameter or a new Quaternion instance if one was not provided.
         *
         * @see Matrix3.fromQuaternion
         */
        3: number;
        length: 4;
    };
    /**
     * Computes a Quaternion from the provided Matrix3 instance.
     *
     * @param {Matrix3} matrix3 The rotation matrix.
     * @param {Quaternion} [result] The object onto which to store the result.
     * @returns {Quaternion} The modified result parameter or a new Quaternion instance if one was not provided.
     *
     * @see Matrix3.fromQuaternion
     */
    function fromRotationMatrix3(matrix3: Readonly<Number9>, result?: Number4): Number4;
    function fromRotationMatrix4(matrix4: Readonly<Number16>, result?: Number4): Number4;
    /**
     * Computes the product of two quaternions.
     *
     * @param {Quaternion} left The first quaternion.
     * @param {Quaternion} right The second quaternion.
     * @param {Quaternion} result The object onto which to store the result.
     * @returns {Quaternion} The modified result parameter.
     */
    function multiply(left: Readonly<Number4>, right: Readonly<Number4>, result?: Number4): Number4;
    /**
     * 给定两个向量来确定四元数，算法来自gl-matrix
     * @param fromVector
     * @param toVector
     * @param result
     */
    function rotationTo(fromVector: Readonly<Number3>, toVector: Readonly<Number3>, result?: Number4): Uint8Array | Float64Array | {
        0: number;
        1: number;
        2: number;
        /**
         * Computes a Quaternion from the provided Matrix3 instance.
         *
         * @param {Matrix3} matrix3 The rotation matrix.
         * @param {Quaternion} [result] The object onto which to store the result.
         * @returns {Quaternion} The modified result parameter or a new Quaternion instance if one was not provided.
         *
         * @see Matrix3.fromQuaternion
         */
        3: number;
        length: 4;
    } | undefined;
    /**
     * Computes the linear interpolation or extrapolation at t using the provided quaternions.
     *
     * @param {Quaternion} start The value corresponding to t at 0.0.
     * @param {Quaternion} end The value corresponding to t at 1.0.
     * @param {Number} t The point along t at which to interpolate.
     * @param {Quaternion} result The object onto which to store the result.
     * @returns {Quaternion} The modified result parameter.
     */
    function lerp(start: Number4, end: Number4, t: number, result: Number4): Number4;
    /**
     * Computes the spherical linear interpolation or extrapolation at t using the provided quaternions.
     *
     * @param {Quaternion} start The value corresponding to t at 0.0.
     * @param {Quaternion} end The value corresponding to t at 1.0.
     * @param {Number} t The point along t at which to interpolate.
     * @param {Quaternion} result The object onto which to store the result.
     * @returns {Quaternion} The modified result parameter.
     *
     * @see Quaternion#fastSlerp
     */
    function slerp(start: Readonly<Number4>, end: Readonly<Number4>, t: number, result?: Number4): Number4;
}
