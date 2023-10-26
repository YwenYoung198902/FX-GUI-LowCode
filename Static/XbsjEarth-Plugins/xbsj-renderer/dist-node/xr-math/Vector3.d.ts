import { Number3 } from "./Numbers";
export declare namespace Vector3 {
    /**
     * Computes the cross (outer) product of two Cartesians.
     *
     * @param {Cartesian3} left The first Cartesian.
     * @param {Cartesian3} right The second Cartesian.
     * @param {Cartesian3} target The object onto which to store the result.
     * @returns {Cartesian3} The cross product.
     */
    function cross(left: Readonly<Number3>, right: Readonly<Number3>, target?: Number3): Number3;
    /**
     * 获取修正后的矢量，该矢量需要和constVector保持垂直！
     * @param constVector 始终保持不变的向量，注意必须是单位向量
     * @param vectorToFix 需要修正的向量
     * @param target 修正后的向量，与constVector保持垂直
     * @param conormalVector 副产品，该向量同时垂直于constVector和vectorToFix，相当于cross(constVector, target)
     */
    function getOrthogonalityVector(constVector: Readonly<Number3>, vectorToFix: Readonly<Number3>, target?: Number3, conormalVector?: Number3): Uint8Array | Float64Array | {
        0: number;
        1: number;
        2: number;
        length: 3;
    } | [number, number, number] | undefined;
    const UNIT_X: Readonly<Uint8Array> | Readonly<Float64Array> | Readonly<{
        0: number;
        1: number;
        2: number;
        length: 3;
    }> | readonly [number, number, number];
    const UNIT_Y: Readonly<Uint8Array> | Readonly<Float64Array> | Readonly<{
        0: number;
        1: number;
        2: number;
        length: 3;
    }> | readonly [number, number, number];
    const UNIT_Z: Readonly<Uint8Array> | Readonly<Float64Array> | Readonly<{
        0: number;
        1: number;
        2: number;
        length: 3;
    }> | readonly [number, number, number];
    const ZERO: Readonly<Uint8Array> | Readonly<Float64Array> | Readonly<{
        0: number;
        1: number;
        2: number;
        length: 3;
    }> | readonly [number, number, number];
    const ONE: Readonly<Uint8Array> | Readonly<Float64Array> | Readonly<{
        0: number;
        1: number;
        2: number;
        length: 3;
    }> | readonly [number, number, number];
    const SCRATCH0: Number3;
    const SCRATCH1: Number3;
    const SCRATCH2: Number3;
    const SCRATCH3: Number3;
    const SCRATCH4: Number3;
    const SCRATCH5: Number3;
    const SCRATCH6: Number3;
    const SCRATCH7: Number3;
    const SCRATCH8: Number3;
    const SCRATCH9: Number3;
}
