import * as Cesium from 'cesium';
export declare type WinPosAndDepth = {
    left: number;
    top: number;
    right: number;
    bottom: number;
    depth: number;
};
export declare function getDefaultWinPosAndDepth(): {
    left: number;
    top: number;
    right: number;
    bottom: number;
    depth: number;
};
export declare function winPosAndDepthEqual(a: WinPosAndDepth, b: WinPosAndDepth): boolean;
/**
 * 获取三维坐标的屏幕位置
 * @param viewer Cesium.Viewer
 * @param cartesian 空间直角坐标系下的位置点
 * @returns [left, top, right, bottom]
 */
export declare function getWinPos(viewer: Cesium.Viewer, cartesian: Cesium.Cartesian3, result?: WinPosAndDepth): WinPosAndDepth | undefined;
