import { Number3, Number4, Number9, Number9_Index } from "./Numbers";
export declare namespace Matrix3 {
    /**
     * Computes the product of two matrices.
     *
     * @param {Matrix3} left The first matrix.
     * @param {Matrix3} right The second matrix.
     * @param {Matrix3} target The object onto which to store the result.
     * @returns {Matrix3} The modified result parameter.
     */
    function multiply(left: Number9, right: Number9, target?: Number9): Uint8Array | Float64Array | {
        0: number;
        1: number;
        2: number;
        3: number;
        4: number;
        5: number;
        6: number;
        7: number;
        8: number;
        length: 9;
    };
    /**
     * Computes the product of a matrix and a column vector.
     *
     * @param {Matrix3} matrix The matrix.
     * @param {Cartesian3} cartesian The column.
     * @param {Cartesian3} result The object onto which to store the result.
     * @returns {Cartesian3} The modified result parameter.
     */
    function multiplyByVector(matrix: Readonly<Number9>, cartesian: Readonly<Number3>, result?: Number3): Number3;
    /**
     * Computes a 3x3 rotation matrix from the provided quaternion.
     *
     * @param {Quaternion} quaternion the quaternion to use.
     * @param {Matrix3} [result] The object in which the result will be stored, if undefined a new instance will be created.
     * @returns {Matrix3} The 3x3 rotation matrix from this quaternion.
     */
    function fromQuaternion(quaternion: Readonly<Number4>, result?: Number9): Uint8Array | Float64Array | {
        0: number;
        1: number;
        2: number;
        3: number;
        4: number;
        5: number;
        6: number;
        7: number;
        8: number;
        length: 9;
    };
    /**
     * Extracts the non-uniform scale assuming the matrix is an affine transformation.
     *
     * @param {Matrix3} matrix The matrix.
     * @param {Cartesian3} result The object onto which to store the result.
     * @returns {Cartesian3} The modified result parameter.
     */
    function getScale(matrix: Readonly<Number9>, target?: Number3): Uint8Array | Float64Array | {
        0: number;
        1: number;
        2: number;
        length: 3;
    };
    /**
     * Computes the array index of the element at the provided row and column.
     *
     * @param {Number} row The zero-based index of the row.
     * @param {Number} column The zero-based index of the column.
     * @returns {Number} The index of the element at the provided row and column.
     *
     * @exception {DeveloperError} row must be 0, 1, or 2.
     * @exception {DeveloperError} column must be 0, 1, or 2.
     *
     * @example
     * var myMatrix = new Cesium.Matrix3();
     * var column1Row0Index = Cesium.Matrix3.getElementIndex(1, 0);
     * var column1Row0 = myMatrix[column1Row0Index]
     * myMatrix[column1Row0Index] = 10.0;
     */
    function getElementIndex(column: number, row: number): Number9_Index;
    const IDENTITY: Readonly<Uint8Array> | Readonly<Float64Array> | Readonly<{
        0: number;
        1: number;
        2: number;
        3: number;
        4: number;
        5: number;
        6: number;
        7: number;
        8: number;
        length: 9;
    }> | readonly [number, number, number, number, number, number, number, number, number];
    const COLUMN0ROW0 = 0;
    const COLUMN0ROW1 = 1;
    const COLUMN0ROW2 = 2;
    const COLUMN1ROW0 = 3;
    const COLUMN1ROW1 = 4;
    const COLUMN1ROW2 = 5;
    const COLUMN2ROW0 = 6;
    const COLUMN2ROW1 = 7;
    const COLUMN2ROW2 = 8;
}
