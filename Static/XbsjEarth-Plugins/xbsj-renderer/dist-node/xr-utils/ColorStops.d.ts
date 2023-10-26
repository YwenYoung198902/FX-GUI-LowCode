import { Event } from './pipe/Event';
declare type ColorStopValueType = {
    ratio: number;
    rgba: [number, number, number, number];
};
export declare class ColorStops {
    _value: ColorStopValueType[];
    _valueStr: string;
    _valueChanged?: Event<[ColorStopValueType[], ColorStopValueType[]]>;
    constructor();
    get valueChanged(): Event<[ColorStopValueType[], ColorStopValueType[]]>;
    set value(value: {
        ratio: number;
        rgba: [number, number, number, number];
    }[]);
    /**
     * 注意这个value是拷贝的属性，修改无用！且尽量少调用，性能堪忧！
     */
    get value(): {
        ratio: number;
        rgba: [number, number, number, number];
    }[];
    get valueStr(): string;
    get minRatio(): number;
    get maxRatio(): number;
    private _getRatioIndex;
    /**
     *
     * @param ratio 比率
     * @param result 获得的颜色值
     * @returns 返回result，若有错，返回undefined！
     */
    getRatioColor(ratio: number, result: [number, number, number, number]): [number, number, number, number] | undefined;
    /**
     * 获取色带，注意仅为一行
     * @param result 数据必须是4的倍数！
     * @example
     * // buffer 一行数据，new Uint8Array(1024*4)
     * builtinColorStops.getColorsInUint8(new Uint8Array(1024*4));
     */
    getColorsInUint8(result: Uint8Array): Uint8Array;
    getColorsInUint8(result: number[]): number[];
}
export {};
