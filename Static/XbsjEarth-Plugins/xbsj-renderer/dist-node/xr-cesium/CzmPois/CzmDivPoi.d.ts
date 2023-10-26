import { Destroyable, DivPoi, FloatDiv } from "xbsj-renderer/dist-node/xr-utils";
import * as Cesium from 'cesium';
import { WinPosFromCartesian } from "../shared/WinPosFromCartesian";
import { CzmPoisContext } from './CzmPoisContext';
export declare type IconDetailSwitchPoiStyle = 'canvas' | 'div';
export declare class CzmDivPoi<T extends FloatDiv> extends Destroyable {
    private _czmPoisContext;
    _divPoi: DivPoi<T>;
    _show: boolean;
    _occludedByEarth: boolean;
    _winPosFromCartesian: WinPosFromCartesian;
    constructor(customDivClass: new () => T, _czmPoisContext: CzmPoisContext, outWinPosFromCartesian?: WinPosFromCartesian);
    get divPoi(): DivPoi<T>;
    _updateShow(): void;
    set cartesian(value: Cesium.Cartesian3);
    get cartesian(): Cesium.Cartesian3;
    get winPosFromCartesian(): WinPosFromCartesian;
    set show(value: boolean);
    get show(): boolean;
}
