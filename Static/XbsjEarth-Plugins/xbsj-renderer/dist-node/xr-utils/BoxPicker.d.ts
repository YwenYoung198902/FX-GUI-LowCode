import { Destroyable } from "./Destroyable";
import { Event } from "./pipe/Event";
declare type BoxPickerActionType = 'PointerDown' | 'PointerMove' | 'PointerUp';
declare type PickRectType = {
    left0: number;
    top0: number;
    left1: number;
    top1: number;
};
export declare class BoxPicker extends Destroyable {
    _pickRectEvent: Event<[PickRectType]>;
    _updateRectEvent: Event<[PickRectType]>;
    _pointerActionEvent: Event<[{
        type: BoxPickerActionType;
        left: number;
        top: number;
    }]>;
    _active: import("./ReactiveVariable").ReactiveVariable<boolean>;
    _pickRect: PickRectType;
    private _setPickRect;
    constructor();
    pointerDown(left: number, top: number): void;
    pointerMove(left: number, top: number): void;
    pointerUp(left: number, top: number): void;
    reset(): void;
    get activeEvent(): Pick<Event<[boolean, boolean]>, "empty" | "on" | "disposableOn" | "once" | "disposableOnce" | "off" | "reset" | "destroy">;
    get updateRectEvent(): Pick<Event<[PickRectType]>, "empty" | "on" | "disposableOn" | "once" | "disposableOnce" | "off" | "reset" | "destroy">;
    get pickRectEvent(): Pick<Event<[PickRectType]>, "empty" | "on" | "disposableOn" | "once" | "disposableOnce" | "off" | "reset" | "destroy">;
    static getLeftTopAndSize(pickRect: PickRectType, target?: {
        left: number;
        top: number;
        width: number;
        height: number;
        forward: boolean;
    }): {
        left: number;
        top: number;
        width: number;
        height: number;
        forward: boolean;
    };
    static contains(left: number, top: number, leftTopAndSize: {
        left: number;
        top: number;
        width: number;
        height: number;
    }): boolean;
}
export declare class DivBoxPicker extends BoxPicker {
    constructor(container: HTMLDivElement);
}
export {};
