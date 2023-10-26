import { Number16, Number4 } from '../Numbers';
export declare function _getColumn(matrix: Readonly<Number16>, index: number, target?: Number4): Uint8Array | Float64Array | {
    0: number;
    1: number;
    2: number;
    3: number;
    length: 4;
};
export declare function _setColumn(matrix: Readonly<Number16>, index: number, cartesian: Readonly<Number4>, target?: Number16): Number16;
