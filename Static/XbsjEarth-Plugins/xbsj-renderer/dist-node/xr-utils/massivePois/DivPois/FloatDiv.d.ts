import { Event } from '../../pipe/Event';
import { Destroyable } from '../../Destroyable';
import { ObjPool } from '../../ObjPool';
export declare abstract class FloatDiv extends Destroyable {
    protected _closeEvent?: Event;
    protected _show: boolean;
    protected _showChanged?: Event<[boolean]>;
    protected _opacity: number;
    protected _opacityChanged?: Event<[number]>;
    protected _winPos: [number, number];
    protected _winPosChanged?: Event<[[number, number]]>;
    abstract reset(): void;
    abstract get element(): HTMLDivElement;
    set winPos(value: [number, number]);
    get winPos(): [number, number];
    get winPosChanged(): Event<[[number, number]]>;
    set opacity(value: number);
    get opacity(): number;
    get opacityChanged(): Event<[number]>;
    set show(value: boolean);
    get show(): boolean;
    get showChanged(): Event<[boolean]>;
    get closeEvent(): Event<[]>;
}
export declare type FloatDivClass<T extends FloatDiv> = {
    new (): T;
};
export declare function getFloatDivPool<T extends FloatDiv>(customDivClass: FloatDivClass<T>): ObjPool<T>;
