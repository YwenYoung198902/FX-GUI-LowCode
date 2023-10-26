import { Destroyable } from "../../Destroyable";
import { CanvasPrimitive } from "./CanvasPrimitive";
export declare function uint32ToUint8s(uint32: number): [number, number, number];
export declare function uint8sToUint32(r: number, g: number, b: number): number;
export declare class PickColorMananger extends Destroyable {
    private _pickColors;
    private _pickColorIndex;
    reset(): void;
    createPickColor(poi: CanvasPrimitive, tag: string): number[];
    /**
     *
     * @param r 0-255
     * @param g 0-255
     * @param b 0-255
     * @returns
     */
    getPickInfoFromColor(r: number, g: number, b: number): {
        poi: CanvasPrimitive | null;
        tag: string;
    } | undefined;
    destroy(): undefined;
}
