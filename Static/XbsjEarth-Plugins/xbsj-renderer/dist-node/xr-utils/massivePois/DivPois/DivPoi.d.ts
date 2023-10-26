import { Event } from '../../pipe/Event';
import { Destroyable } from '../../Destroyable';
import { FloatDiv, FloatDivClass } from "./FloatDiv";
export declare class DivPoi<T extends FloatDiv> extends Destroyable {
    private _customDivClass;
    private _divContainer;
    private _floatDiv?;
    private _show;
    private _showChanged?;
    constructor(_customDivClass: FloatDivClass<T>, _divContainer: HTMLDivElement);
    private _updateDivPoi;
    set show(value: boolean);
    get show(): boolean;
    get floatDiv(): T;
    get showChanged(): Event<[boolean]>;
}
