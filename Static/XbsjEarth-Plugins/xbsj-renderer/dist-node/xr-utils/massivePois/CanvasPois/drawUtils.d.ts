export declare type DrawRect = {
    left: number;
    top: number;
    right: number;
    bottom: number;
};
export declare function getDrawRect(winPos: [number, number], size: [number, number], scale: [number, number], originRatioAndOffset: [number, number, number, number]): DrawRect;
/**
 *
 * @param ctx Context
 * @param mbx 底部中点x值
 * @param mby 底部中点y值
 * @param w 底部中点到圆心中点的距离
 * @param fillStyle
 */
export declare function drawPoint(ctx: CanvasRenderingContext2D, mbx: number, mby: number, w: number, fillStyle: string): void;
export declare function drawRoundRectPath(ctx: CanvasRenderingContext2D, left: number, top: number, width: number, height: number, radius: number): void;
export declare function drawText(ctx: CanvasRenderingContext2D, cx: number, cy: number, text: string, font: string, fillStyle: string): void;
export declare function imageToCanvas(image: CanvasImageSource): HTMLCanvasElement;
export declare function setCanvasUniformColor(canvas: HTMLCanvasElement, color: [number, number, number]): void;
export declare function drawTextBlock(ctx: CanvasRenderingContext2D, left: number, top: number, originRatioAndOffset: [number, number, number, number] | undefined, text: string, fontStyle?: string, borderWidth?: number, fgStyle?: string, bgStyle?: string): void;
export declare function uint8ToHexStr(uint8: number): string;
export declare function getColorHexStr(color: [number, number, number, number]): string;
