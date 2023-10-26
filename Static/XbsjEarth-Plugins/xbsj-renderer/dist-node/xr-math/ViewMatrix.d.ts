import { Number16, Number3, Number4, Number9 } from "./Numbers";
export declare namespace ViewMatrix {
    /**
     * Computes a Matrix4 instance that transforms from world space to view space.
     *
     * @param {Cartesian3} position The position of the camera.
     * @param {Cartesian3} direction The forward direction.
     * @param {Cartesian3} up The up direction.
     * @param {Cartesian3} right The right direction.
     * @param {Matrix4} target The object in which the result will be stored.
     * @returns {Matrix4} The modified result parameter.
     */
    function computeView(position: Readonly<Number3>, direction: Readonly<Number3>, up: Readonly<Number3>, right: Readonly<Number3>, target?: Number16): Uint8Array | Float64Array | {
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
    function fromRotationMatrix3AndPosition(position: Readonly<Number3>, rotationMatrix3: Readonly<Number9>, target?: Number16): Uint8Array | Float64Array | {
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
    function fromRotationQuatAndPosition(position: Readonly<Number3>, rotationQuat: Readonly<Number4>, target?: Number16): Uint8Array | Float64Array | {
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
    /**
     * Computes a Matrix4 instance that transforms from world space to view space.
     *
     * @param {Cartesian3} eye The position of the camera.
     * @param {Cartesian3} center The forward direction.
     * @param {Cartesian3} up The up direction.
     * @param {Matrix4} target The object in which the result will be stored.
     * @returns {Matrix4} The modified result parameter.
     */
    function lookAt(eye: Readonly<Number3>, center: Readonly<Number3>, up: Readonly<Number3>, target?: Number16): Uint8Array | Float64Array | {
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
    function lookAtWithDirection(eye: Readonly<Number3>, direction: Readonly<Number3>, up: Readonly<Number3>, target?: Number16): Uint8Array | Float64Array | {
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
    function getDirection(viewMatrix: Readonly<Number16>, target?: Number3): Number3;
    function getRight(viewMatrix: Readonly<Number16>, target?: Number3): Number3;
    function getUp(viewMatrix: Readonly<Number16>, target?: Number3): Number3;
    function getRotationQuat(viewMatrix4: Readonly<Number16>, target?: Number4): Number4;
    /**
     * 注意获得的3x3矩阵是getMatrix3的逆矩阵，这里假定viewMatrix是真的viewMatrix，不能有缩放！
     * @param viewMatrix
     * @param target
     */
    function getRotationMatrix(viewMatrix: Readonly<Number16>, target?: Number9): void;
    function getEye(viewMatrix: Readonly<Number16>, target?: Number3): Number3;
    /**
     * 计算从眼睛到目标的距离，注意这个距离是沿着视线方向上的距离
     * @param viewMatrix
     * @param target
     */
    function distanceFromEye(viewMatrix: Readonly<Number16>, target: Readonly<Number3>): number;
    /**
     * 屏幕到世界坐标空间下的单位之比
     * @param projectionMatrix
     * @param viewport
     * @param distanceFromEyeToTarget
     */
    function ratioScreenToWorldSpace(projectionMatrix: Readonly<Number16>, viewport: Readonly<Number4>, distanceFromEyeToTarget: number): number;
    function rotateWithAxis(viewMatrix: Readonly<Number16>, origin: Readonly<Number3>, axis: Readonly<Number3>, rotateAngle: number, target?: Number16): Number16;
    /**
     * Computes a Matrix4 instance representing an orthographic transformation matrix.
     *
     * @param left The number of meters to the left of the camera that will be in view.
     * @param right The number of meters to the right of the camera that will be in view.
     * @param bottom The number of meters below of the camera that will be in view.
     * @param top The number of meters above of the camera that will be in view.
     * @param near The distance to the near plane in meters.
     * @param far The distance to the far plane in meters.
     * @param result The object in which the result will be stored.
     * @returns The modified result parameter.
     */
    function computeOrthographicOffCenter(left: number, right: number, bottom: number, top: number, near: number, far: number, result?: Number16): Uint8Array | Float64Array | {
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
}
