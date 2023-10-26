import { Destroyable } from "xbsj-renderer/dist-node/xr-utils";
import * as Cesium from 'cesium';
import { WinPosFromCartesian } from "../shared/WinPosFromCartesian";
import { CzmPoisContext } from './CzmPoisContext';
export declare class CzmBasePoi extends Destroyable {
    protected _czmPoisContext: CzmPoisContext;
    private _show;
    private _winPosFromCartesian;
    private _near;
    private _far;
    private _actualShow;
    constructor(_czmPoisContext: CzmPoisContext, outWinPosFromCartesian?: WinPosFromCartesian);
    protected get actualShowChanged(): Pick<import("../../xr-utils").Event<[boolean, boolean]>, "empty" | "on" | "disposableOn" | "once" | "disposableOnce" | "off" | "reset" | "destroy">;
    protected get actualShow(): boolean;
    set cartesian(value: Cesium.Cartesian3);
    get cartesian(): Cesium.Cartesian3;
    get winPosFromCartesian(): WinPosFromCartesian;
    set show(value: boolean);
    get show(): boolean;
    set near(value: number);
    get near(): number;
    set far(value: number);
    get far(): number;
}
