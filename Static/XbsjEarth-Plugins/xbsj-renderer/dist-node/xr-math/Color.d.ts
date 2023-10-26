import { Number4, Numbers } from "./Numbers";
export declare namespace Color {
    function uint8ToFloat(uint8Value: number): number;
    function uint8ToFloat<T extends Readonly<Numbers>>(uint8Value: T, target?: T): T;
    function floatToUint8<T extends (number | Readonly<Numbers>)>(floatValue: T, target?: T): number | {
        [index: number]: number;
        readonly length: number;
    };
    function rgbaFloatToUint32(rgbaFloatValue: Readonly<Number4>): number;
    function uint32ToRgbaFloat(uint32Value: number, target?: Number4): Number4;
}
