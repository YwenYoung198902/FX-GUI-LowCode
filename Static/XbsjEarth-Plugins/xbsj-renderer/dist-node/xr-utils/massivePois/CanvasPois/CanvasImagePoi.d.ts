import { CanvasPoi } from "./CanvasPoi";
import { CanvasPrimitivesContext } from "./CanvasPrimitivesContext";
export declare class CanvasImagePoi extends CanvasPoi {
    private _image?;
    private _size;
    private _originRatioAndOffset;
    private _defaultColorStr;
    private _tooltip;
    private _title;
    private __scale;
    private _tooltipAlpha;
    private _bgColor;
    private _bgColorHexStr;
    private _fgColor;
    private _fgColorHexStr;
    constructor(canvasPrimitivesContext: CanvasPrimitivesContext, _image?: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap | OffscreenCanvas | SVGImageElement | undefined, _size?: [number, number], _originRatioAndOffset?: [number, number, number, number], // 原点在底部中间位置，先到比例所在位置，再做进一步偏移。
    _defaultColorStr?: string);
    set size(value: [number, number]);
    get size(): [number, number];
    protected set _scale(value: [number, number]);
    protected get _scale(): [number, number];
    set fgColor(value: [number, number, number, number]);
    get fgColor(): [number, number, number, number];
    set bgColor(value: [number, number, number, number]);
    get bgColor(): [number, number, number, number];
    set originRatioAndOffset(value: [number, number, number, number]);
    get originRatioAndOffset(): [number, number, number, number];
    set image(value: CanvasImageSource | undefined);
    get image(): CanvasImageSource | undefined;
    set defaultColorStr(value: string);
    get defaultColorStr(): string;
    set tooltip(value: string);
    get tooltip(): string;
    set title(value: string);
    get title(): string;
    draw(ctx: CanvasRenderingContext2D): void;
    drawForPick(ctx: CanvasRenderingContext2D, createPickColor: (tag: string) => string): void;
}
