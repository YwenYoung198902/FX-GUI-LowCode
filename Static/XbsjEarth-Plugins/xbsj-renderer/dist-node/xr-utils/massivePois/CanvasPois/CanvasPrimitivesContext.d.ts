import { Destroyable } from '../../Destroyable';
import { CanvasPrimitive } from './CanvasPrimitive';
export declare class CanvasPrimitivesContext extends Destroyable {
    private _pois;
    private _canvasElement;
    private _ctx;
    private _offscreenCanvasElement;
    private _offscreenCanvasElement2;
    private _offscreenCtx;
    private _offscreenCtx2;
    private _size;
    private _needRedraw;
    private _needPickRedraw;
    private _pickColorManager;
    constructor();
    get element(): HTMLCanvasElement;
    private _dirty;
    get size(): [number, number];
    addPoi(poi: CanvasPrimitive): void;
    removePoi(poi: CanvasPrimitive): void;
    private _draw;
    pick(x: number, y: number, w: number, h: number): {
        poi: CanvasPrimitive;
        tag: string;
    }[];
    private _pickDraw;
    /**
     * 注意获取到的结果有可能是重复的！
     * @param x
     * @param y
     * @param w
     * @param h
     * @returns
     */
    private _getPickInfo;
}
