import { CanvasPoi, CanvasPrimitivesContext } from "xbsj-renderer/dist-node/xr-utils";
import { WinPosFromCartesian } from "../shared/WinPosFromCartesian";
import { CzmBasePoi } from './CzmBasePoi';
import { CzmPoisContext } from './CzmPoisContext';
export declare class CzmCanvasPoi<T extends CanvasPoi> extends CzmBasePoi {
    private _canvasPoi;
    constructor(canvasPoiClass: new (canvasPrimitivesContext: CanvasPrimitivesContext) => T, czmPoisContext: CzmPoisContext, outWinPosFromCartesian?: WinPosFromCartesian);
    get canvasPoi(): T;
}
