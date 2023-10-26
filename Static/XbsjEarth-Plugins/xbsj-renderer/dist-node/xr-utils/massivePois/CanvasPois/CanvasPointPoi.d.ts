import { Event } from '../../pipe/Event';
import { CanvasPoi } from "./CanvasPoi";
import { CanvasPrimitivesContext } from "./CanvasPrimitivesContext";
export declare class CanvasPointPoi extends CanvasPoi {
    private _width;
    private _text;
    private _fillStyle;
    private _scale;
    protected _scaleChanged?: Event<[number, CanvasPointPoi]>;
    constructor(canvasPrimitivesContext: CanvasPrimitivesContext);
    /**
     * poi的缩放属性，可读写，默认1.0
     */
    set scale(value: number);
    get scale(): number;
    /**
     * poi的缩放属性发生变化时触发此事件！
     * @example
     * // 监听scale变化
     * var d = xxx.scaleChanged.disposableOn(scale => console.log(`scale: ${scale}`));
     * // 取消监听
     * d();
     */
    get scaleChanged(): Event<[number, CanvasPointPoi]>;
    set width(value: number);
    get width(): number;
    /**
     * poi中显示的文字，可以读写
     * @example
     * poi.text = '123';
     */
    set text(value: string);
    /**
     * poi中显示的文字，可以读写
     */
    get text(): string;
    /**
     * poi的样式(颜色)，可以读写，和Canvas中的设置保持一致
     * @link https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors
     * @example
     * poi.fillStyle = "orange";
     * poi.fillStyle = "#FFA500";
     * poi.fillStyle = "rgb(255,165,0)";
     * poi.fillStyle = "rgba(255,165,0,1)";
     */
    set fillStyle(value: string);
    /**
     * poi的样式(颜色)，可以读写，和Canvas中的设置保持一致
     * @link https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors
     */
    get fillStyle(): string;
    /**
     * 绘制poi
     * @param ctx Canvas的Context，用来绘制
     * @returns
     */
    draw(ctx: CanvasRenderingContext2D): void;
    /**
     * 该操作主要用于拾取，需要在绘制区域返回createPickColor中指定的颜色，借此来拾取相应的对象
     * @param ctx
     * @param createPickColor
     * @returns
     */
    drawForPick(ctx: CanvasRenderingContext2D, createPickColor: (tag: string) => string): void;
}
