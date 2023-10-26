import { Destroyable } from "../../Destroyable";
import { DivPoi, FloatDivClass, PosFloatDiv } from ".";
export declare class CursorFloatDiv extends PosFloatDiv {
    constructor();
}
/**
 * 用来创建跟随光标运动的div，可以任意填充内容
 *
 * @example
 * // 默认使用的是CursorFloatDiv，代码可以简写如下：
 * const cursorInfo = new CursorInfo(div, CursorFloatDiv);
 * // 以上代码相当于：
 * // 用户可以定义自己的类，类似CursorFloatDiv
 * class CursorFloatDiv extends PosFloatDiv {
 *     constructor() {
 *         super()
 *
 *         this.contentDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
 *         this.contentDiv.style.borderRadius = '3px';
 *         this.contentDiv.style.color = 'rgb(255, 255, 255)';
 *         this.contentDiv.style.padding = '1px 5px 1px 5px';
 *         this.contentDiv.style.fontSize = '12px';
 *         this.contentDiv.style.whiteSpace = 'nowrap';
 *
 *         this.contentDiv.innerText = `未定义光标信息！`;
 *         this.originRatioX = 0;
 *         this.originRatioY = 0;
 *         this.originOffsetX = -16;
 *     }
 * }
 * const cursorInfo = new CursorInfo<CursorFloatDiv>(div, CursorFloatDiv);
 */
export declare class CursorInfo<DivClass extends PosFloatDiv> extends Destroyable {
    _cursorDiv: DivPoi<DivClass>;
    constructor(container: HTMLDivElement, divClass: FloatDivClass<DivClass>);
    get cursorDiv(): DivPoi<DivClass>;
    set text(value: string);
    get text(): string;
    set show(value: boolean);
    get show(): boolean;
}
