import { CanvasPoi, CanvasPrimitivesContext, Destroyable, Event, FloatDiv } from "xbsj-renderer/dist-node/xr-utils";
import * as Cesium from 'cesium';
import { WinPosFromCartesian } from "../shared/WinPosFromCartesian";
import { CzmCanvasPoi } from "./CzmCanvasPoi";
import { CzmDivPoi } from "./CzmDivPoi";
import { CzmPoisContext } from "./CzmPoisContext";
export declare type CzmCanvasAndDivSwitchPoiStatus = "Canvas" | "Div";
export declare class CzmCanvasAndDivSwitchPoi<T extends CanvasPoi, R extends FloatDiv> extends Destroyable {
    private _czmPoisContext;
    private _czmCanvasPoi;
    private _czmDivPoi;
    private _show;
    private _winPosFromCartesian;
    private _switchTransition;
    private _status;
    private _statusChanged?;
    constructor(canvasPoiClass: new (canvasPrimitivesContext: CanvasPrimitivesContext) => T, floatDivClass: new () => R, _czmPoisContext: CzmPoisContext, outWinPosFromCartesian?: WinPosFromCartesian);
    private _updateShow;
    set show(value: boolean);
    get show(): boolean;
    set cartesian(value: Cesium.Cartesian3);
    get cartesian(): Cesium.Cartesian3;
    get winPosFromCartesian(): WinPosFromCartesian;
    set status(value: CzmCanvasAndDivSwitchPoiStatus);
    get status(): CzmCanvasAndDivSwitchPoiStatus;
    get statusChanged(): Event<[CzmCanvasAndDivSwitchPoiStatus]>;
    get czmCanvasPoi(): CzmCanvasPoi<T>;
    get czmDivPoi(): CzmDivPoi<R>;
}
