import { Number16, Number3, Number4, Number6 } from "./Numbers";
export declare namespace Plane {
    /**
     * plane的法向到point的距离，注意有正负号，正号表示在plane的正面，负号表示在plane的负面
     * @param plane
     * @param point
     */
    function distancePlaneToPoint(plane: Readonly<Number4>, point: Number3): number;
    /**
     * 把Point投影到Plane上，或者Plane上的投影点
     * @param point
     * @param plane
     * @param target
     */
    function projectPointOntoPlane(point: Number3, plane: Number4, target?: Number3): Uint8Array | Float64Array | {
        0: number;
        1: number;
        2: number;
        length: 3;
    };
    function getNormal(plane: Readonly<Number4>, target?: Number3): Uint8Array | Float64Array | {
        0: number;
        1: number;
        2: number;
        length: 3;
    };
    function getDistance(plane: Readonly<Number4>): number;
    function setNormal(target: Number4, normal: Readonly<Number3>): Number4;
    function setDistance(target: Number4, distance: number): Number4;
    /**
     * 射线到平面的距离，如果为负值，表示在射线相反的方向才有交点
     * 注意，这里不考虑平面的正反向，都能相交
     * @param ray [origin0, origin1, origin2, direction0, direction1, direction2]
     * @param plane [normal0, normal1, normal2, distance]
     * @param target
     */
    function distanceRayToPlane(ray: Readonly<Number6>, plane: Readonly<Number4>, epsilon?: number): number | undefined;
    /**
     * Transforms the plane by the given transformation matrix.
     *
     * @param {Plane} plane The plane.
     * @param {Matrix4} transform The transformation matrix.
     * @param {Plane} [target] The object into which to store the result.
     * @returns {Plane} The plane transformed by the given transformation matrix.
     */
    function transform(plane: Readonly<Number4>, transform: Readonly<Number16>, target?: Number4): Uint8Array | Float64Array | {
        0: number;
        1: number;
        2: number;
        3: number;
        length: 4;
    };
    /**
     * Creates a plane from a normal and a point on the plane.
     *
     * @param {Cartesian3} point The point on the plane.
     * @param {Cartesian3} normal The plane's normal (normalized).
     * @param {Plane} [result] The object onto which to store the result.
     * @returns {Plane} A new plane instance or the modified result parameter.
     *
     * @example
     * var point = Cesium.Cartesian3.fromDegrees(-72.0, 40.0);
     * var normal = ellipsoid.geodeticSurfaceNormal(point);
     * var tangentPlane = Cesium.Plane.fromPointNormal(point, normal);
     *
     * @exception {DeveloperError} Normal must be normalized
     */
    function fromPointNormal(point: Number3, normal: Number3, result?: Number4): Uint8Array | Float64Array | {
        0: number;
        1: number;
        2: number;
        3: number;
        length: 4;
    };
    const UNIT_X: Number4;
    const UNIT_Y: Number4;
    const UNIT_Z: Number4;
}
