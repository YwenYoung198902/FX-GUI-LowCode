import { PosFloatDiv } from "./PosFloatDiv";
export declare type DivAbsoluteWinPos = {
    top: number;
    left: number;
} | {
    top: number;
    right: number;
} | {
    bottom: number;
    left: number;
} | {
    bottom: number;
    right: number;
};
export declare function createCloseDiv(bgColorStr: string, borderRadius: number, winPos: DivAbsoluteWinPos): HTMLDivElement;
export declare function createBottomTriangleElement(width: number, height: number, colorStr?: string): HTMLDivElement[];
export declare class BorderedPosFloatDiv extends PosFloatDiv {
    private _borderDiv;
    private _closeDiv;
    private _innerContentDiv;
    private _colorStr;
    private _divColorChanged;
    private _borderRadius;
    constructor();
    get borderDiv(): HTMLDivElement;
    get innerContentDiv(): HTMLDivElement;
    reset(): void;
    get colorStr(): string;
    set colorStr(value: string);
    get borderRadius(): number;
    set borderRadius(value: number);
}
