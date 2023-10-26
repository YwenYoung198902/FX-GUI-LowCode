import { FloatDiv } from "./FloatDiv";
export declare class ToolTipDiv extends FloatDiv {
    _div: HTMLDivElement;
    _contentContainer: HTMLDivElement;
    _text: string;
    constructor();
    get element(): HTMLDivElement;
    reset(): void;
    set text(value: string);
    get text(): string;
}
