import { Destroyable } from 'xbsj-renderer/dist-node/xr-utils';
import { Event } from '@/xr-utils';
import { StartUpdateFuncType } from '@/xr-utils';
export declare class PointerDragDrop extends Destroyable {
    private _element;
    x: number;
    y: number;
    dx: number;
    dy: number;
    _moveEvent: Event<[number, number, number, number]>;
    _moveStartEvent: Event<[number, number]>;
    _moveStopEvent: Event;
    constructor(_element: HTMLElement, { leftButton, middleButton, rightButton, }?: {
        leftButton?: boolean;
        middleButton?: boolean;
        rightButton?: boolean;
        startUpdateFunc?: StartUpdateFuncType;
    });
    get startMoveEvent(): Event<[number, number]>;
    get moveEvent(): Event<[number, number, number, number]>;
    get stopMoveEvent(): Event<[]>;
    forceStop(): void;
    _start(pointerEvent: PointerEvent): void;
    _rawStop(): void;
    _stop(): void;
    _onPointerDown(left: number, top: number, pointerEvent: PointerEvent): void;
    _onPointerUp(): void;
    _onPointerCancel(): void;
    _onPointerMove(left: number, top: number, pointerEvent: PointerEvent): void;
}
