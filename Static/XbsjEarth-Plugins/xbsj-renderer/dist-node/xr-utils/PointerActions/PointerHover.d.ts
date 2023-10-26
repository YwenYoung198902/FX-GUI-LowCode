import { Destroyable } from '../Destroyable';
import { Event } from '../pipe/Event';
export declare class PointerHover extends Destroyable {
    _hoverEvent: Event<[number, number, PointerEvent | undefined]>;
    _hoverOutEvent: Event;
    constructor(div: HTMLDivElement, delayTime?: number);
    get hoverEvent(): Event<[number, number, PointerEvent | undefined]>;
    get hoverOutEvent(): Event<[]>;
}
