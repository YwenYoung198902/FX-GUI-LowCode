import { Number3, Number12, Number9, Number4, Number16 } from "./Numbers";
export declare namespace OrientedBoundingBox {
    function getCenter(orientedBoundingBox: Number12, target?: Number3): Uint8Array | Float64Array | {
        0: number;
        1: number;
        2: number;
        length: 3;
    };
    function getHalfAxes(orientedBoundingBox: Number12, target?: Number9): Uint8Array | Float64Array | {
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
    function setCenter(target: Number12, center: Number3): Number12;
    function setHalfAxes(target: Number12, halfAxes: Number9): Number12;
    function getModelMatrix(orientedBoundingBox: Number12, target?: Number16): Number16;
    /**
     * Determines which side of a plane the oriented bounding box is located.
     *
     * @param {OrientedBoundingBox} box The oriented bounding box to test.
     * @param {Plane} plane The plane to test against.
     * @returns {Intersect} {@link Intersect.INSIDE} if the entire box is on the side of the plane
     *                      the normal is pointing, {@link Intersect.OUTSIDE} if the entire box is
     *                      on the opposite side, and {@link Intersect.INTERSECTING} if the box
     *                      intersects the plane.
     */
    function intersectPlane(box: Number12, plane: Number4): 1 | 0 | -1;
    function getBoundingSphere(box: Number12, target?: Number4): Uint8Array | Float64Array | {
        0: number;
        1: number;
        2: number;
        3: number;
        length: 4;
    };
}
