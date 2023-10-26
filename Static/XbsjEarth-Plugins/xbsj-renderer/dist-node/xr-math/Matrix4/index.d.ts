import { Number16, Number3, Number4, Number9 } from '../Numbers';
import { ContinuousMultiplyOp } from './multiply';
export declare namespace Matrix4 {
    /**
     * Computes the array index of the element at the provided row and column.
     *
     * @param {Number} row The zero-based index of the row.
     * @param {Number} column The zero-based index of the column.
     * @returns {Number} The index of the element at the provided row and column.
     *
     * @exception {DeveloperError} row must be 0, 1, 2, or 3.
     * @exception {DeveloperError} column must be 0, 1, 2, or 3.
     *
     * @example
     * var myMatrix = new Cesium.Matrix4();
     * var column1Row0Index = Cesium.Matrix4.getElementIndex(1, 0);
     * var column1Row0 = myMatrix[column1Row0Index];
     * myMatrix[column1Row0Index] = 10.0;
     */
    function getElementIndex(column: number, row: number): number;
    /**
     * Retrieves a copy of the matrix column at the provided index as a Cartesian4 instance.
     *
     * @param {Matrix4} matrix The matrix to use.
     * @param {Number} index The zero-based index of the column to retrieve.
     * @param {Cartesian4} target The object onto which to store the result.
     * @returns {Cartesian4} The modified result parameter.
     *
     * @exception {DeveloperError} index must be 0, 1, 2, or 3.
     *
     * @example
     * //returns a Cartesian4 instance with values from the specified column
     * // m = [10.0, 11.0, 12.0, 13.0]
     * //     [14.0, 15.0, 16.0, 17.0]
     * //     [18.0, 19.0, 20.0, 21.0]
     * //     [22.0, 23.0, 24.0, 25.0]
     *
     * //Example 1: Creates an instance of Cartesian
     * var a = Cesium.Matrix4.getColumn(m, 2, new Cesium.Cartesian4());
     *
     * @example
     * //Example 2: Sets values for Cartesian instance
     * var a = new Cesium.Cartesian4();
     * Cesium.Matrix4.getColumn(m, 2, a);
     *
     * // a.x = 12.0; a.y = 16.0; a.z = 20.0; a.w = 24.0;
     */
    function getColumn(matrix: Number16, index: number, target?: Number4): Uint8Array | Float64Array | {
        0: number;
        1: number;
        2: number;
        3: number;
        length: 4;
    };
    /**
     * Computes a new matrix that replaces the specified column in the provided matrix with the provided Cartesian4 instance.
     *
     * @param {Matrix4} matrix The matrix to use.
     * @param {Number} index The zero-based index of the column to set.
     * @param {Cartesian4} cartesian The Cartesian whose values will be assigned to the specified column.
     * @param {Matrix4} result The object onto which to store the result.
     * @returns {Matrix4} The modified result parameter.
     *
     * @exception {DeveloperError} index must be 0, 1, 2, or 3.
     *
     * @example
     * //creates a new Matrix4 instance with new column values from the Cartesian4 instance
     * // m = [10.0, 11.0, 12.0, 13.0]
     * //     [14.0, 15.0, 16.0, 17.0]
     * //     [18.0, 19.0, 20.0, 21.0]
     * //     [22.0, 23.0, 24.0, 25.0]
     *
     * var a = Cesium.Matrix4.setColumn(m, 2, new Cesium.Cartesian4(99.0, 98.0, 97.0, 96.0), new Cesium.Matrix4());
     *
     * // m remains the same
     * // a = [10.0, 11.0, 99.0, 13.0]
     * //     [14.0, 15.0, 98.0, 17.0]
     * //     [18.0, 19.0, 97.0, 21.0]
     * //     [22.0, 23.0, 96.0, 25.0]
     */
    function setColumn(matrix: Number16, index: number, cartesian: Number4, target?: Number16): Number16;
    /**
     * Retrieves a copy of the matrix row at the provided index as a Cartesian4 instance.
     *
     * @param {Matrix4} matrix The matrix to use.
     * @param {Number} index The zero-based index of the row to retrieve.
     * @param {Cartesian4} target The object onto which to store the result.
     * @returns {Cartesian4} The modified result parameter.
     *
     * @exception {DeveloperError} index must be 0, 1, 2, or 3.
     *
     * @example
     * //returns a Cartesian4 instance with values from the specified column
     * // m = [10.0, 11.0, 12.0, 13.0]
     * //     [14.0, 15.0, 16.0, 17.0]
     * //     [18.0, 19.0, 20.0, 21.0]
     * //     [22.0, 23.0, 24.0, 25.0]
     *
     * //Example 1: Returns an instance of Cartesian
     * var a = Cesium.Matrix4.getRow(m, 2, new Cesium.Cartesian4());
     *
     * @example
     * //Example 2: Sets values for a Cartesian instance
     * var a = new Cesium.Cartesian4();
     * Cesium.Matrix4.getRow(m, 2, a);
     *
     * // a.x = 18.0; a.y = 19.0; a.z = 20.0; a.w = 21.0;
     */
    function getRow(matrix: Readonly<Number16>, index: number, target?: Number4): Uint8Array | Float64Array | {
        0: number;
        1: number;
        2: number;
        3: number;
        length: 4;
    };
    /**
     * Computes a new matrix that replaces the specified row in the provided matrix with the provided Cartesian4 instance.
     *
     * @param {Matrix4} matrix The matrix to use.
     * @param {Number} index The zero-based index of the row to set.
     * @param {Cartesian4} cartesian The Cartesian whose values will be assigned to the specified row.
     * @param {Matrix4} target The object onto which to store the result.
     * @returns {Matrix4} The modified result parameter.
     *
     * @exception {DeveloperError} index must be 0, 1, 2, or 3.
     *
     * @example
     * //create a new Matrix4 instance with new row values from the Cartesian4 instance
     * // m = [10.0, 11.0, 12.0, 13.0]
     * //     [14.0, 15.0, 16.0, 17.0]
     * //     [18.0, 19.0, 20.0, 21.0]
     * //     [22.0, 23.0, 24.0, 25.0]
     *
     * var a = Cesium.Matrix4.setRow(m, 2, new Cesium.Cartesian4(99.0, 98.0, 97.0, 96.0), new Cesium.Matrix4());
     *
     * // m remains the same
     * // a = [10.0, 11.0, 12.0, 13.0]
     * //     [14.0, 15.0, 16.0, 17.0]
     * //     [99.0, 98.0, 97.0, 96.0]
     * //     [22.0, 23.0, 24.0, 25.0]
     */
    function setRow(matrix: Readonly<Number16>, index: number, cartesian: Readonly<Number4>, target?: Number16): void;
    /**
     * Gets the translation portion of the provided matrix, assuming the matrix is a affine transformation matrix.
     *
     * @param {Matrix4} matrix The matrix to use.
     * @param {Cartesian3} target The object onto which to store the result.
     * @returns {Cartesian3} The modified result parameter.
     */
    function getTranslation(matrix: Readonly<Number16>, target?: Number3): Uint8Array | Float64Array | {
        0: number;
        1: number;
        2: number;
        length: 3;
    };
    /**
     * Computes a new matrix that replaces the translation in the rightmost column of the provided
     * matrix with the provided translation.  This assumes the matrix is an affine transformation
     *
     * @param {Matrix4} matrix The matrix to use.
     * @param {Cartesian3} translation The translation that replaces the translation of the provided matrix.
     * @param {Matrix4} target The object onto which to store the result.
     * @returns {Matrix4} The modified result parameter.
     */
    function setTranslation(matrix: Readonly<Number16>, translation: Readonly<Number3>, target?: Number16): Uint8Array | Float64Array | {
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
        /**
         * Computes a new matrix that replaces the specified column in the provided matrix with the provided Cartesian4 instance.
         *
         * @param {Matrix4} matrix The matrix to use.
         * @param {Number} index The zero-based index of the column to set.
         * @param {Cartesian4} cartesian The Cartesian whose values will be assigned to the specified column.
         * @param {Matrix4} result The object onto which to store the result.
         * @returns {Matrix4} The modified result parameter.
         *
         * @exception {DeveloperError} index must be 0, 1, 2, or 3.
         *
         * @example
         * //creates a new Matrix4 instance with new column values from the Cartesian4 instance
         * // m = [10.0, 11.0, 12.0, 13.0]
         * //     [14.0, 15.0, 16.0, 17.0]
         * //     [18.0, 19.0, 20.0, 21.0]
         * //     [22.0, 23.0, 24.0, 25.0]
         *
         * var a = Cesium.Matrix4.setColumn(m, 2, new Cesium.Cartesian4(99.0, 98.0, 97.0, 96.0), new Cesium.Matrix4());
         *
         * // m remains the same
         * // a = [10.0, 11.0, 99.0, 13.0]
         * //     [14.0, 15.0, 98.0, 17.0]
         * //     [18.0, 19.0, 97.0, 21.0]
         * //     [22.0, 23.0, 96.0, 25.0]
         */
        12: number;
        13: number;
        14: number;
        15: number;
        length: 16;
    };
    /**
     * Extracts the non-uniform scale assuming the matrix is an affine transformation.
     *
     * @param {Matrix4} matrix The matrix.
     * @param {Cartesian3} target The object onto which to store the result.
     * @returns {Cartesian3} The modified result parameter
     */
    function getScale(matrix: Readonly<Number16>, target?: Number3): Uint8Array | Float64Array | {
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
    function setScale(matrix: Readonly<Number16>, scale: Readonly<Number3>, result?: Number16): {
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
        /**
         * Computes a new matrix that replaces the specified column in the provided matrix with the provided Cartesian4 instance.
         *
         * @param {Matrix4} matrix The matrix to use.
         * @param {Number} index The zero-based index of the column to set.
         * @param {Cartesian4} cartesian The Cartesian whose values will be assigned to the specified column.
         * @param {Matrix4} result The object onto which to store the result.
         * @returns {Matrix4} The modified result parameter.
         *
         * @exception {DeveloperError} index must be 0, 1, 2, or 3.
         *
         * @example
         * //creates a new Matrix4 instance with new column values from the Cartesian4 instance
         * // m = [10.0, 11.0, 12.0, 13.0]
         * //     [14.0, 15.0, 16.0, 17.0]
         * //     [18.0, 19.0, 20.0, 21.0]
         * //     [22.0, 23.0, 24.0, 25.0]
         *
         * var a = Cesium.Matrix4.setColumn(m, 2, new Cesium.Cartesian4(99.0, 98.0, 97.0, 96.0), new Cesium.Matrix4());
         *
         * // m remains the same
         * // a = [10.0, 11.0, 99.0, 13.0]
         * //     [14.0, 15.0, 98.0, 17.0]
         * //     [18.0, 19.0, 97.0, 21.0]
         * //     [22.0, 23.0, 96.0, 25.0]
         */
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
    function getMaximumScale(matrix: Readonly<Number16>): number;
    /**
     * Computes the sum of two matrices.
     *
     * @param left The first matrix.
     * @param right The second matrix.
     * @param target The object onto which to store the result.
     * @returns The modified result parameter.
     */
    function multiply(left: Readonly<Number16>, right: Readonly<Number16>, target?: Number16): Uint8Array | Float64Array | {
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
        /**
         * Computes a new matrix that replaces the specified column in the provided matrix with the provided Cartesian4 instance.
         *
         * @param {Matrix4} matrix The matrix to use.
         * @param {Number} index The zero-based index of the column to set.
         * @param {Cartesian4} cartesian The Cartesian whose values will be assigned to the specified column.
         * @param {Matrix4} result The object onto which to store the result.
         * @returns {Matrix4} The modified result parameter.
         *
         * @exception {DeveloperError} index must be 0, 1, 2, or 3.
         *
         * @example
         * //creates a new Matrix4 instance with new column values from the Cartesian4 instance
         * // m = [10.0, 11.0, 12.0, 13.0]
         * //     [14.0, 15.0, 16.0, 17.0]
         * //     [18.0, 19.0, 20.0, 21.0]
         * //     [22.0, 23.0, 24.0, 25.0]
         *
         * var a = Cesium.Matrix4.setColumn(m, 2, new Cesium.Cartesian4(99.0, 98.0, 97.0, 96.0), new Cesium.Matrix4());
         *
         * // m remains the same
         * // a = [10.0, 11.0, 99.0, 13.0]
         * //     [14.0, 15.0, 98.0, 17.0]
         * //     [18.0, 19.0, 97.0, 21.0]
         * //     [22.0, 23.0, 96.0, 25.0]
         */
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
     * const m3 = mat4MultiplyTransformation(m1, m2, createNumber16());
     */
    function multiplyTransformation(left: Readonly<Number16>, right: Readonly<Number16>, target?: Number16): Uint8Array | Float64Array | {
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
        /**
         * Computes a new matrix that replaces the specified column in the provided matrix with the provided Cartesian4 instance.
         *
         * @param {Matrix4} matrix The matrix to use.
         * @param {Number} index The zero-based index of the column to set.
         * @param {Cartesian4} cartesian The Cartesian whose values will be assigned to the specified column.
         * @param {Matrix4} result The object onto which to store the result.
         * @returns {Matrix4} The modified result parameter.
         *
         * @exception {DeveloperError} index must be 0, 1, 2, or 3.
         *
         * @example
         * //creates a new Matrix4 instance with new column values from the Cartesian4 instance
         * // m = [10.0, 11.0, 12.0, 13.0]
         * //     [14.0, 15.0, 16.0, 17.0]
         * //     [18.0, 19.0, 20.0, 21.0]
         * //     [22.0, 23.0, 24.0, 25.0]
         *
         * var a = Cesium.Matrix4.setColumn(m, 2, new Cesium.Cartesian4(99.0, 98.0, 97.0, 96.0), new Cesium.Matrix4());
         *
         * // m remains the same
         * // a = [10.0, 11.0, 99.0, 13.0]
         * //     [14.0, 15.0, 98.0, 17.0]
         * //     [18.0, 19.0, 97.0, 21.0]
         * //     [22.0, 23.0, 96.0, 25.0]
         */
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
    function multiplyByMatrix3(matrix: Readonly<Number16>, rotation: Readonly<Number9>, target?: Number16): Uint8Array | Float64Array | {
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
        /**
         * Computes a new matrix that replaces the specified column in the provided matrix with the provided Cartesian4 instance.
         *
         * @param {Matrix4} matrix The matrix to use.
         * @param {Number} index The zero-based index of the column to set.
         * @param {Cartesian4} cartesian The Cartesian whose values will be assigned to the specified column.
         * @param {Matrix4} result The object onto which to store the result.
         * @returns {Matrix4} The modified result parameter.
         *
         * @exception {DeveloperError} index must be 0, 1, 2, or 3.
         *
         * @example
         * //creates a new Matrix4 instance with new column values from the Cartesian4 instance
         * // m = [10.0, 11.0, 12.0, 13.0]
         * //     [14.0, 15.0, 16.0, 17.0]
         * //     [18.0, 19.0, 20.0, 21.0]
         * //     [22.0, 23.0, 24.0, 25.0]
         *
         * var a = Cesium.Matrix4.setColumn(m, 2, new Cesium.Cartesian4(99.0, 98.0, 97.0, 96.0), new Cesium.Matrix4());
         *
         * // m remains the same
         * // a = [10.0, 11.0, 99.0, 13.0]
         * //     [14.0, 15.0, 98.0, 17.0]
         * //     [18.0, 19.0, 97.0, 21.0]
         * //     [22.0, 23.0, 96.0, 25.0]
         */
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
    function multiplyByTranslation(matrix: Readonly<Number16>, translation: Readonly<Number3>, target?: Number16): Uint8Array | Float64Array | {
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
        /**
         * Computes a new matrix that replaces the specified column in the provided matrix with the provided Cartesian4 instance.
         *
         * @param {Matrix4} matrix The matrix to use.
         * @param {Number} index The zero-based index of the column to set.
         * @param {Cartesian4} cartesian The Cartesian whose values will be assigned to the specified column.
         * @param {Matrix4} result The object onto which to store the result.
         * @returns {Matrix4} The modified result parameter.
         *
         * @exception {DeveloperError} index must be 0, 1, 2, or 3.
         *
         * @example
         * //creates a new Matrix4 instance with new column values from the Cartesian4 instance
         * // m = [10.0, 11.0, 12.0, 13.0]
         * //     [14.0, 15.0, 16.0, 17.0]
         * //     [18.0, 19.0, 20.0, 21.0]
         * //     [22.0, 23.0, 24.0, 25.0]
         *
         * var a = Cesium.Matrix4.setColumn(m, 2, new Cesium.Cartesian4(99.0, 98.0, 97.0, 96.0), new Cesium.Matrix4());
         *
         * // m remains the same
         * // a = [10.0, 11.0, 99.0, 13.0]
         * //     [14.0, 15.0, 98.0, 17.0]
         * //     [18.0, 19.0, 97.0, 21.0]
         * //     [22.0, 23.0, 96.0, 25.0]
         */
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
    function multiplyByUniformScale(matrix: Readonly<Number16>, scale: number, target?: Number16): void;
    /**
     * Multiplies an affine transformation matrix (with a bottom row of <code>[0.0, 0.0, 0.0, 1.0]</code>)
     * by an implicit non-uniform scale matrix.  This is an optimization
     * for <code>Matrix4.multiply(m, Matrix4.fromUniformScale(scale), m);</code>, where
     * <code>m</code> must be an affine matrix.
     * This function performs fewer allocations and arithmetic operations.
     * !!! 注意这个函数使用时，只能针对affine矩阵，不能有projection，否则就不对了!
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
    function multiplyByScale(matrix: Readonly<Number16>, scale: Readonly<Number3>, target?: Number16): {
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
        /**
         * Computes a new matrix that replaces the specified column in the provided matrix with the provided Cartesian4 instance.
         *
         * @param {Matrix4} matrix The matrix to use.
         * @param {Number} index The zero-based index of the column to set.
         * @param {Cartesian4} cartesian The Cartesian whose values will be assigned to the specified column.
         * @param {Matrix4} result The object onto which to store the result.
         * @returns {Matrix4} The modified result parameter.
         *
         * @exception {DeveloperError} index must be 0, 1, 2, or 3.
         *
         * @example
         * //creates a new Matrix4 instance with new column values from the Cartesian4 instance
         * // m = [10.0, 11.0, 12.0, 13.0]
         * //     [14.0, 15.0, 16.0, 17.0]
         * //     [18.0, 19.0, 20.0, 21.0]
         * //     [22.0, 23.0, 24.0, 25.0]
         *
         * var a = Cesium.Matrix4.setColumn(m, 2, new Cesium.Cartesian4(99.0, 98.0, 97.0, 96.0), new Cesium.Matrix4());
         *
         * // m remains the same
         * // a = [10.0, 11.0, 99.0, 13.0]
         * //     [14.0, 15.0, 98.0, 17.0]
         * //     [18.0, 19.0, 97.0, 21.0]
         * //     [22.0, 23.0, 96.0, 25.0]
         */
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
    function multiplyByVector(matrix: Readonly<Number16>, cartesian: Readonly<Number4>, target?: Number4): Uint8Array | Float64Array | {
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
    function multiplyByPointAsVector(matrix: Readonly<Number16>, cartesian: Readonly<Number3>, target?: Number3): Uint8Array | Float64Array | {
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
    function affineMultiplyByPoint(matrix: Readonly<Number16>, cartesian: Readonly<Number3>, target?: Number3): Uint8Array | Float64Array | {
        0: number;
        1: number;
        2: number;
        length: 3;
    };
    function multiplyByPoint(matrix: Readonly<Number16>, cartesian: Readonly<Number3>, target?: Number3): Uint8Array | Float64Array | {
        0: number;
        1: number;
        2: number;
        length: 3;
    };
    function continuousMultiply<T>(target: Number16, firstArg: Readonly<Number16>, ...args: Readonly<Number16 | [ContinuousMultiplyOp<T>, T]>[]): Number16;
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
    function transpose(matrix: Readonly<Number16>, target?: Number16): Uint8Array | Float64Array | {
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
        /**
         * Computes a new matrix that replaces the specified column in the provided matrix with the provided Cartesian4 instance.
         *
         * @param {Matrix4} matrix The matrix to use.
         * @param {Number} index The zero-based index of the column to set.
         * @param {Cartesian4} cartesian The Cartesian whose values will be assigned to the specified column.
         * @param {Matrix4} result The object onto which to store the result.
         * @returns {Matrix4} The modified result parameter.
         *
         * @exception {DeveloperError} index must be 0, 1, 2, or 3.
         *
         * @example
         * //creates a new Matrix4 instance with new column values from the Cartesian4 instance
         * // m = [10.0, 11.0, 12.0, 13.0]
         * //     [14.0, 15.0, 16.0, 17.0]
         * //     [18.0, 19.0, 20.0, 21.0]
         * //     [22.0, 23.0, 24.0, 25.0]
         *
         * var a = Cesium.Matrix4.setColumn(m, 2, new Cesium.Cartesian4(99.0, 98.0, 97.0, 96.0), new Cesium.Matrix4());
         *
         * // m remains the same
         * // a = [10.0, 11.0, 99.0, 13.0]
         * //     [14.0, 15.0, 98.0, 17.0]
         * //     [18.0, 19.0, 97.0, 21.0]
         * //     [22.0, 23.0, 96.0, 25.0]
         */
        12: number;
        13: number;
        14: number;
        15: number;
        length: 16;
    };
    /**
     * Gets the upper left 3x3 rotation matrix of the provided matrix, assuming the matrix is an affine transformation matrix.
     *
     * @param matrix4 The matrix to use.
     * @param target The object onto which to store the result.
     * @returns The modified result parameter.
     *
     * @example
     * // returns a Matrix3 instance from a Matrix4 instance
     *
     * // m = [10.0, 14.0, 18.0, 22.0]
     * //     [11.0, 15.0, 19.0, 23.0]
     * //     [12.0, 16.0, 20.0, 24.0]
     * //     [13.0, 17.0, 21.0, 25.0]
     *
     * var b = createNumbers(9);
     * Matrix4.getMatrix3(m,b);
     *
     * // b = [10.0, 14.0, 18.0]
     * //     [11.0, 15.0, 19.0]
     * //     [12.0, 16.0, 20.0]
     */
    function getMatrix3(matrix4: Readonly<Number16>, target?: Number9): Uint8Array | Float64Array | {
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
    function setMatrix3(matrix3: Readonly<Number9>, target?: Number16): void;
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
    function inverse(matrix: Readonly<Number16>, target?: Number16): Uint8Array | Float64Array | {
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
        /**
         * Computes a new matrix that replaces the specified column in the provided matrix with the provided Cartesian4 instance.
         *
         * @param {Matrix4} matrix The matrix to use.
         * @param {Number} index The zero-based index of the column to set.
         * @param {Cartesian4} cartesian The Cartesian whose values will be assigned to the specified column.
         * @param {Matrix4} result The object onto which to store the result.
         * @returns {Matrix4} The modified result parameter.
         *
         * @exception {DeveloperError} index must be 0, 1, 2, or 3.
         *
         * @example
         * //creates a new Matrix4 instance with new column values from the Cartesian4 instance
         * // m = [10.0, 11.0, 12.0, 13.0]
         * //     [14.0, 15.0, 16.0, 17.0]
         * //     [18.0, 19.0, 20.0, 21.0]
         * //     [22.0, 23.0, 24.0, 25.0]
         *
         * var a = Cesium.Matrix4.setColumn(m, 2, new Cesium.Cartesian4(99.0, 98.0, 97.0, 96.0), new Cesium.Matrix4());
         *
         * // m remains the same
         * // a = [10.0, 11.0, 99.0, 13.0]
         * //     [14.0, 15.0, 98.0, 17.0]
         * //     [18.0, 19.0, 97.0, 21.0]
         * //     [22.0, 23.0, 96.0, 25.0]
         */
        12: number;
        13: number;
        14: number;
        15: number;
        length: 16;
    };
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
    function inverseTransformation(matrix: Readonly<Number16>, target?: Number16): Uint8Array | Float64Array | {
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
        /**
         * Computes a new matrix that replaces the specified column in the provided matrix with the provided Cartesian4 instance.
         *
         * @param {Matrix4} matrix The matrix to use.
         * @param {Number} index The zero-based index of the column to set.
         * @param {Cartesian4} cartesian The Cartesian whose values will be assigned to the specified column.
         * @param {Matrix4} result The object onto which to store the result.
         * @returns {Matrix4} The modified result parameter.
         *
         * @exception {DeveloperError} index must be 0, 1, 2, or 3.
         *
         * @example
         * //creates a new Matrix4 instance with new column values from the Cartesian4 instance
         * // m = [10.0, 11.0, 12.0, 13.0]
         * //     [14.0, 15.0, 16.0, 17.0]
         * //     [18.0, 19.0, 20.0, 21.0]
         * //     [22.0, 23.0, 24.0, 25.0]
         *
         * var a = Cesium.Matrix4.setColumn(m, 2, new Cesium.Cartesian4(99.0, 98.0, 97.0, 96.0), new Cesium.Matrix4());
         *
         * // m remains the same
         * // a = [10.0, 11.0, 99.0, 13.0]
         * //     [14.0, 15.0, 98.0, 17.0]
         * //     [18.0, 19.0, 97.0, 21.0]
         * //     [22.0, 23.0, 96.0, 25.0]
         */
        12: number;
        13: number;
        14: number;
        15: number;
        length: 16;
    };
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
        9: number;
        10: number;
        11: number;
        /**
         * Computes a new matrix that replaces the specified column in the provided matrix with the provided Cartesian4 instance.
         *
         * @param {Matrix4} matrix The matrix to use.
         * @param {Number} index The zero-based index of the column to set.
         * @param {Cartesian4} cartesian The Cartesian whose values will be assigned to the specified column.
         * @param {Matrix4} result The object onto which to store the result.
         * @returns {Matrix4} The modified result parameter.
         *
         * @exception {DeveloperError} index must be 0, 1, 2, or 3.
         *
         * @example
         * //creates a new Matrix4 instance with new column values from the Cartesian4 instance
         * // m = [10.0, 11.0, 12.0, 13.0]
         * //     [14.0, 15.0, 16.0, 17.0]
         * //     [18.0, 19.0, 20.0, 21.0]
         * //     [22.0, 23.0, 24.0, 25.0]
         *
         * var a = Cesium.Matrix4.setColumn(m, 2, new Cesium.Cartesian4(99.0, 98.0, 97.0, 96.0), new Cesium.Matrix4());
         *
         * // m remains the same
         * // a = [10.0, 11.0, 99.0, 13.0]
         * //     [14.0, 15.0, 98.0, 17.0]
         * //     [18.0, 19.0, 97.0, 21.0]
         * //     [22.0, 23.0, 96.0, 25.0]
         */
        12: number;
        13: number;
        14: number;
        15: number;
        length: 16;
    }> | readonly [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];
    const ZERO: Readonly<Uint8Array> | Readonly<Float64Array> | Readonly<{
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
        /**
         * Computes a new matrix that replaces the specified column in the provided matrix with the provided Cartesian4 instance.
         *
         * @param {Matrix4} matrix The matrix to use.
         * @param {Number} index The zero-based index of the column to set.
         * @param {Cartesian4} cartesian The Cartesian whose values will be assigned to the specified column.
         * @param {Matrix4} result The object onto which to store the result.
         * @returns {Matrix4} The modified result parameter.
         *
         * @exception {DeveloperError} index must be 0, 1, 2, or 3.
         *
         * @example
         * //creates a new Matrix4 instance with new column values from the Cartesian4 instance
         * // m = [10.0, 11.0, 12.0, 13.0]
         * //     [14.0, 15.0, 16.0, 17.0]
         * //     [18.0, 19.0, 20.0, 21.0]
         * //     [22.0, 23.0, 24.0, 25.0]
         *
         * var a = Cesium.Matrix4.setColumn(m, 2, new Cesium.Cartesian4(99.0, 98.0, 97.0, 96.0), new Cesium.Matrix4());
         *
         * // m remains the same
         * // a = [10.0, 11.0, 99.0, 13.0]
         * //     [14.0, 15.0, 98.0, 17.0]
         * //     [18.0, 19.0, 97.0, 21.0]
         * //     [22.0, 23.0, 96.0, 25.0]
         */
        12: number;
        13: number;
        14: number;
        15: number;
        length: 16;
    }> | readonly [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];
    function fromTranslation(translation: Readonly<Number3>, result?: Number16): Uint8Array | Float64Array | {
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
        /**
         * Computes a new matrix that replaces the specified column in the provided matrix with the provided Cartesian4 instance.
         *
         * @param {Matrix4} matrix The matrix to use.
         * @param {Number} index The zero-based index of the column to set.
         * @param {Cartesian4} cartesian The Cartesian whose values will be assigned to the specified column.
         * @param {Matrix4} result The object onto which to store the result.
         * @returns {Matrix4} The modified result parameter.
         *
         * @exception {DeveloperError} index must be 0, 1, 2, or 3.
         *
         * @example
         * //creates a new Matrix4 instance with new column values from the Cartesian4 instance
         * // m = [10.0, 11.0, 12.0, 13.0]
         * //     [14.0, 15.0, 16.0, 17.0]
         * //     [18.0, 19.0, 20.0, 21.0]
         * //     [22.0, 23.0, 24.0, 25.0]
         *
         * var a = Cesium.Matrix4.setColumn(m, 2, new Cesium.Cartesian4(99.0, 98.0, 97.0, 96.0), new Cesium.Matrix4());
         *
         * // m remains the same
         * // a = [10.0, 11.0, 99.0, 13.0]
         * //     [14.0, 15.0, 98.0, 17.0]
         * //     [18.0, 19.0, 97.0, 21.0]
         * //     [22.0, 23.0, 96.0, 25.0]
         */
        12: number;
        13: number;
        14: number;
        15: number;
        length: 16;
    };
    /**
     * Computes a Matrix4 instance from a Matrix3 representing the rotation
     * and a Cartesian3 representing the translation.
     *
     * @param {Matrix3} rotation The upper left portion of the matrix representing the rotation.
     * @param {Cartesian3} [translation=Cartesian3.ZERO] The upper right portion of the matrix representing the translation.
     * @param {Matrix4} [result] The object in which the result will be stored, if undefined a new instance will be created.
     * @returns {Matrix4} The modified result parameter, or a new Matrix4 instance if one was not provided.
     */
    function fromMatrix3AndTranslation(rotation: Readonly<Number9>, translation?: Readonly<Number3>, result?: Number16): Uint8Array | Float64Array | {
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
        /**
         * Computes a new matrix that replaces the specified column in the provided matrix with the provided Cartesian4 instance.
         *
         * @param {Matrix4} matrix The matrix to use.
         * @param {Number} index The zero-based index of the column to set.
         * @param {Cartesian4} cartesian The Cartesian whose values will be assigned to the specified column.
         * @param {Matrix4} result The object onto which to store the result.
         * @returns {Matrix4} The modified result parameter.
         *
         * @exception {DeveloperError} index must be 0, 1, 2, or 3.
         *
         * @example
         * //creates a new Matrix4 instance with new column values from the Cartesian4 instance
         * // m = [10.0, 11.0, 12.0, 13.0]
         * //     [14.0, 15.0, 16.0, 17.0]
         * //     [18.0, 19.0, 20.0, 21.0]
         * //     [22.0, 23.0, 24.0, 25.0]
         *
         * var a = Cesium.Matrix4.setColumn(m, 2, new Cesium.Cartesian4(99.0, 98.0, 97.0, 96.0), new Cesium.Matrix4());
         *
         * // m remains the same
         * // a = [10.0, 11.0, 99.0, 13.0]
         * //     [14.0, 15.0, 98.0, 17.0]
         * //     [18.0, 19.0, 97.0, 21.0]
         * //     [22.0, 23.0, 96.0, 25.0]
         */
        12: number;
        13: number;
        14: number;
        15: number;
        length: 16;
    };
    function fromRotateQuatAndTranslation(rotateQuat: Readonly<Number4>, translation?: Readonly<Number3>, result?: Number16): Uint8Array | Float64Array | {
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
        /**
         * Computes a new matrix that replaces the specified column in the provided matrix with the provided Cartesian4 instance.
         *
         * @param {Matrix4} matrix The matrix to use.
         * @param {Number} index The zero-based index of the column to set.
         * @param {Cartesian4} cartesian The Cartesian whose values will be assigned to the specified column.
         * @param {Matrix4} result The object onto which to store the result.
         * @returns {Matrix4} The modified result parameter.
         *
         * @exception {DeveloperError} index must be 0, 1, 2, or 3.
         *
         * @example
         * //creates a new Matrix4 instance with new column values from the Cartesian4 instance
         * // m = [10.0, 11.0, 12.0, 13.0]
         * //     [14.0, 15.0, 16.0, 17.0]
         * //     [18.0, 19.0, 20.0, 21.0]
         * //     [22.0, 23.0, 24.0, 25.0]
         *
         * var a = Cesium.Matrix4.setColumn(m, 2, new Cesium.Cartesian4(99.0, 98.0, 97.0, 96.0), new Cesium.Matrix4());
         *
         * // m remains the same
         * // a = [10.0, 11.0, 99.0, 13.0]
         * //     [14.0, 15.0, 98.0, 17.0]
         * //     [18.0, 19.0, 97.0, 21.0]
         * //     [22.0, 23.0, 96.0, 25.0]
         */
        12: number;
        13: number;
        14: number;
        15: number;
        length: 16;
    };
    function fromDirectionUpRightAndTranslation(direction: Readonly<Number3>, up: Readonly<Number3>, right: Readonly<Number3>, translation?: Readonly<Number3>, target?: Number16): Number16;
    /**
     * Computes a Matrix4 instance representing a non-uniform scale.
     *
     * @param {Cartesian3} scale The x, y, and z scale factors.
     * @param {Matrix4} [target] The object in which the result will be stored, if undefined a new instance will be created.
     * @returns {Matrix4} The modified result parameter, or a new Matrix4 instance if one was not provided.
     *
     * @example
     * // Creates
     * //   [7.0, 0.0, 0.0, 0.0]
     * //   [0.0, 8.0, 0.0, 0.0]
     * //   [0.0, 0.0, 9.0, 0.0]
     * //   [0.0, 0.0, 0.0, 1.0]
     * var m = Cesium.Matrix4.fromScale(new Cesium.Cartesian3(7.0, 8.0, 9.0));
     */
    function fromScale(scale: Number3, target?: Number16): Number16;
    const Z2NY: Uint8Array | Float64Array | {
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
        /**
         * Computes a new matrix that replaces the specified column in the provided matrix with the provided Cartesian4 instance.
         *
         * @param {Matrix4} matrix The matrix to use.
         * @param {Number} index The zero-based index of the column to set.
         * @param {Cartesian4} cartesian The Cartesian whose values will be assigned to the specified column.
         * @param {Matrix4} result The object onto which to store the result.
         * @returns {Matrix4} The modified result parameter.
         *
         * @exception {DeveloperError} index must be 0, 1, 2, or 3.
         *
         * @example
         * //creates a new Matrix4 instance with new column values from the Cartesian4 instance
         * // m = [10.0, 11.0, 12.0, 13.0]
         * //     [14.0, 15.0, 16.0, 17.0]
         * //     [18.0, 19.0, 20.0, 21.0]
         * //     [22.0, 23.0, 24.0, 25.0]
         *
         * var a = Cesium.Matrix4.setColumn(m, 2, new Cesium.Cartesian4(99.0, 98.0, 97.0, 96.0), new Cesium.Matrix4());
         *
         * // m remains the same
         * // a = [10.0, 11.0, 99.0, 13.0]
         * //     [14.0, 15.0, 98.0, 17.0]
         * //     [18.0, 19.0, 97.0, 21.0]
         * //     [22.0, 23.0, 96.0, 25.0]
         */
        12: number;
        13: number;
        14: number;
        15: number;
        length: 16;
    };
    function fromAxisAngle(axis: Readonly<Number3>, angle: number, result?: Number16): Uint8Array | Float64Array | {
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
        /**
         * Computes a new matrix that replaces the specified column in the provided matrix with the provided Cartesian4 instance.
         *
         * @param {Matrix4} matrix The matrix to use.
         * @param {Number} index The zero-based index of the column to set.
         * @param {Cartesian4} cartesian The Cartesian whose values will be assigned to the specified column.
         * @param {Matrix4} result The object onto which to store the result.
         * @returns {Matrix4} The modified result parameter.
         *
         * @exception {DeveloperError} index must be 0, 1, 2, or 3.
         *
         * @example
         * //creates a new Matrix4 instance with new column values from the Cartesian4 instance
         * // m = [10.0, 11.0, 12.0, 13.0]
         * //     [14.0, 15.0, 16.0, 17.0]
         * //     [18.0, 19.0, 20.0, 21.0]
         * //     [22.0, 23.0, 24.0, 25.0]
         *
         * var a = Cesium.Matrix4.setColumn(m, 2, new Cesium.Cartesian4(99.0, 98.0, 97.0, 96.0), new Cesium.Matrix4());
         *
         * // m remains the same
         * // a = [10.0, 11.0, 99.0, 13.0]
         * //     [14.0, 15.0, 98.0, 17.0]
         * //     [18.0, 19.0, 97.0, 21.0]
         * //     [22.0, 23.0, 96.0, 25.0]
         */
        12: number;
        13: number;
        14: number;
        15: number;
        length: 16;
    };
}
