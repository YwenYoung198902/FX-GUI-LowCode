declare type Variogram = {
    t: number[] | Float64Array;
    x: number[] | Float64Array;
    y: number[] | Float64Array;
    z: number[] | Float64Array;
    nugget: number;
    range: number;
    sill: number;
    A: number;
    n: number;
    model: (h: number, nugget: number, range: number, sill: number, A: number) => number;
    M?: number[] | Float64Array;
};
export declare namespace Kriging {
    function train(t: number[] | Float64Array, x: number[] | Float64Array, y: number[] | Float64Array, z: number[] | Float64Array, model: 'gaussian' | 'exponential' | 'spherical', sigma2: number, alpha: number, mResult: number[] | Float64Array): Variogram;
    function predict(x: number, y: number, z: number, variogram: Variogram): number;
}
export {};
