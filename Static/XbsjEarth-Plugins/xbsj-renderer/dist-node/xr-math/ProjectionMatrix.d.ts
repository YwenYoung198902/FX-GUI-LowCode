import { Number16 } from "./Numbers";
export declare namespace ProjectionMatrix {
    namespace Perspective {
        /**
         * Computes a Matrix4 instance representing a perspective transformation matrix.
         *
         * @param {Number} fovY The field of view along the Y axis in radians.
         * @param {Number} aspectRatio The aspect ratio.
         * @param {Number} near The distance to the near plane in meters.
         * @param {Number} far The distance to the far plane in meters.
         * @param {Matrix4} target The object in which the result will be stored.
         * @returns {Matrix4} The modified result parameter.
         *
         * @exception {DeveloperError} fovY must be in (0, PI].
         * @exception {DeveloperError} aspectRatio must be greater than zero.
         * @exception {DeveloperError} near must be greater than zero.
         * @exception {DeveloperError} far must be greater than zero.
         */
        function compute(fovY: number, aspectRatio: number, near: number, far: number, target?: Number16): Uint8Array | Float64Array | {
            0: number;
            1: number;
            2: number;
            3: number; /**
             * 重置透视投影的近远裁，获得新的投影参数
             * @param n1 新的近裁
             * @param f1 新的远裁
             * @param l 原先的投影矩阵参数 l
             * @param r 原先的投影矩阵参数 r
             * @param b 原先的投影矩阵参数 b
             * @param t 原先的投影矩阵参数 t
             * @param n 原先的投影矩阵参数 n
             * @param f 原先的投影矩阵参数 f
             */
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
         * 获取SseDenominator
         * @param projectionMatrix
         */
        function getSseDenominator(projectionMatrix: Number16): number;
        /**
         * 从透视投影矩阵中提取投透视影参数
         * @param projectionMatrix
         */
        function getPerspectiveParams(projectionMatrix: Number16): {
            n: number;
            f: number;
            r: number;
            l: number;
            t: number;
            b: number;
        };
        /**
         * 重置透视投影的近远裁，获得新的投影参数
         * @param n1 新的近裁
         * @param f1 新的远裁
         * @param l 原先的投影矩阵参数 l
         * @param r 原先的投影矩阵参数 r
         * @param b 原先的投影矩阵参数 b
         * @param t 原先的投影矩阵参数 t
         * @param n 原先的投影矩阵参数 n
         * @param f 原先的投影矩阵参数 f
         */
        function resetNearFar(n1: number, f1: number, l: number, r: number, b: number, t: number, n: number, f: number): {
            l: number;
            r: number;
            b: number;
            t: number;
            n: number;
            f: number;
        };
        /**
         * 根据透视投影参数，获取fov和aspect属性
         * @param l
         * @param r
         * @param b
         * @param t
         * @param n
         * @param f
         */
        function getFovAndAspectRatio(l: number, r: number, b: number, t: number, n: number, f: number): {
            xOffset: number;
            yOffset: number;
            fov: number;
            hFov: number;
            vFov: number;
            aspectRatio: number;
        };
    }
}
