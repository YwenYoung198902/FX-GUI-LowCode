import { Event } from '../../pipe/Event';
import { CanvasPrimitive } from "./CanvasPrimitive";
import { CanvasPrimitivesContext } from "./CanvasPrimitivesContext";
/**
 * Poi的Canvas绘图基类
 */
export declare abstract class CanvasPoi extends CanvasPrimitive {
    protected _winPos: [number, number];
    protected _depth: number;
    private _winPosAndDepthChanged?;
    constructor(canvasPrimitivesContext: CanvasPrimitivesContext, _winPos?: [number, number], _depth?: number);
    /**
     * 窗口坐标，如果在三维中使用，该属性由三维自动控制，请不要手动设置此属性。
     */
    set winPos(value: [number, number]);
    /**
     * 窗口坐标，如果在三维中使用，该属性由三维自动控制，请不要手动设置此属性。
     */
    get winPos(): [number, number];
    /**
     * 深度用来确定poi绘制的先后顺序，决定同一位置的poi谁遮挡谁
     */
    set depth(value: number);
    /**
     * 深度用来确定poi绘制的先后顺序，决定同一位置的poi谁遮挡谁
     */
    get depth(): number;
    /**
     * poi的位置和深度发生变化时，会触发此事件
     */
    get winPosAndDepthChanged(): Event<[[number, number], number]>;
}
