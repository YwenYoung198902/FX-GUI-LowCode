import { Destroyable, Event } from 'xbsj-renderer/dist-node/xr-utils';
import * as Cesium from 'cesium';
import { CzmCameraChanged } from './CzmCameraChanged';
import { WinPosAndDepth } from './getWinPos';
/**
 * Cesium当中用来获取三维坐标的二维屏幕位置
 *
 * @example
 * const winPosFromCartesian = new WinPosFromCartesian(viewer, true);
 * this.dispose(() => winPosFromCartesian.destroy());
 * winPosFromCartesian.cartesian = Cesium.Cartesian3.fromDegrees(116.39, 39.9, 100);
 * this.dispose(winPosFromCartesian.changed.disposableOn((valid, winPosAndDepth) => {
 *     const { left, top, depth } = winPosAndDepth;
 *     // xxx
 * }));
 */
export declare class WinPosFromCartesian extends Destroyable {
    private _viewer;
    _cartesian: Cesium.Cartesian3;
    _winPos: WinPosAndDepth;
    _winPosValid: boolean;
    _changedEvent: Event<[boolean, WinPosAndDepth]>;
    _enabled: boolean;
    constructor(_viewer: Cesium.Viewer, enabled?: boolean, czmCameraChanged?: CzmCameraChanged);
    get enabled(): boolean;
    set enabled(value: boolean);
    _updateWinPos(): void;
    get cartesian(): Cesium.Cartesian3;
    set cartesian(value: Cesium.Cartesian3);
    get changed(): Event<[boolean, WinPosAndDepth]>;
    get winPosValid(): boolean;
    get winPos(): WinPosAndDepth;
}
