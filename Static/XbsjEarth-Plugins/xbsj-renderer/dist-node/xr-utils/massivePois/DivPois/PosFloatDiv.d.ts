import { FloatDiv } from "./FloatDiv";
export declare class PosFloatDiv extends FloatDiv {
    private _div;
    private _contentDiv;
    private _originOffsetX;
    private _originOffsetY;
    private _originRatioX;
    private _originRatioY;
    private _divChanged;
    constructor();
    /**
     * 当前用来填放内容的div，可以设置样式，填充内容
     */
    get contentDiv(): HTMLDivElement;
    reset(): void;
    /**
     * 单位像素，表示从原点在x轴上偏移多少个像素
     */
    get originOffsetX(): number;
    set originOffsetX(value: number);
    /**
     * 单位像素，表示从原点在x轴上偏移多少个像素
     */
    get originOffsetY(): number;
    set originOffsetY(value: number);
    /**
     * 这是一个比率，从0-1分别表示div的最左端到最右端，即0表示原点的x坐标在最左端，1表示原点的x坐标在最右端
     */
    get originRatioX(): number;
    set originRatioX(value: number);
    /**
     * 这是一个比率，从0-1分别表示div的顶端到底部，即0表示原点的y坐标在顶端，1表示原点的y坐标在底部
     */
    get originRatioY(): number;
    set originRatioY(value: number);
    /**
     * 当前的div元素
     */
    get element(): HTMLDivElement;
}
