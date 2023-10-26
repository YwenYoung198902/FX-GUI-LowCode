import { Number16, Number3, Number4 } from "./Numbers";
export declare namespace BoundingSphere {
    function getCenter(boundingSphere: Readonly<Number4>, target?: Number3): Uint8Array | Float64Array | {
        0: number;
        1: number;
        2: number;
        length: 3;
    };
    function getRadius(boundingSphere: Readonly<Number4>): number;
    function setCenter(target: Number4, center: Readonly<Number3>): Number4;
    function setRadius(target: Number4, radius: number): void;
    function fromCenterRadius(center: Readonly<Number3>, radius: number, target?: Number4): Number4;
    /**
     * Determines which side of a plane a sphere is located.
     *
     * @param {BoundingSphere} sphere The bounding sphere to test.
     * @param {Plane} plane The plane to test against.
     * @returns {Intersect} {@link Intersect.INSIDE} if the entire sphere is on the side of the plane
     *                      the normal is pointing, {@link Intersect.OUTSIDE} if the entire sphere is
     *                      on the opposite side, and {@link Intersect.INTERSECTING} if the sphere
     *                      intersects the plane.
     */
    function intersectPlane(sphere: Readonly<Number4>, plane: Readonly<Number4>): 1 | 0 | -1;
    /**
     * Applies a 4x4 affine transformation matrix to a bounding sphere.
     *
     * @param {BoundingSphere} boundingSphere The bounding sphere to apply the transformation to.
     * @param {Matrix4} transform The transformation matrix to apply to the bounding sphere.
     * @param {BoundingSphere} [target] The object onto which to store the result.
     * @returns {BoundingSphere} The modified result parameter or a new BoundingSphere instance if none was provided.
     */
    function transform(boundingSphere: Readonly<Number4>, transform: Readonly<Number16>, target?: Number4): Uint8Array | Float64Array | {
        0: number;
        1: number;
        2: number;
        3: number;
        length: 4;
    };
    /**
     * Computes a bounding sphere that contains both the left and right bounding spheres.
     *
     * @param {BoundingSphere} left A sphere to enclose in a bounding sphere.
     * @param {BoundingSphere} right A sphere to enclose in a bounding sphere.
     * @param {BoundingSphere} [result] The object onto which to store the result.
     * @returns {BoundingSphere} The modified result parameter or a new BoundingSphere instance if none was provided.
     */
    function union(left: Readonly<Number4>, right: Readonly<Number4>, result?: Number4): Uint8Array | Float64Array | {
        0: number;
        1: number;
        2: number;
        3: number;
        length: 4;
    };
    /**
     * Computes a bounding sphere from the corner points of an axis-aligned bounding box.  The sphere
     * tighly and fully encompases the box.
     *
     * @param {Cartesian3} [corner] The minimum height over the rectangle.
     * @param {Cartesian3} [oppositeCorner] The maximum height over the rectangle.
     * @param {BoundingSphere} [result] The object onto which to store the result.
     * @returns {BoundingSphere} The modified result parameter or a new BoundingSphere instance if none was provided.
     *
     * @example
     * // Create a bounding sphere around the unit cube
     * var sphere = Cesium.BoundingSphere.fromCornerPoints(new Cesium.Cartesian3(-0.5, -0.5, -0.5), new Cesium.Cartesian3(0.5, 0.5, 0.5));
     */
    function fromCornerPoints(corner: Readonly<Number3>, oppositeCorner: Readonly<Number3>, result?: Number4): Number4;
}
