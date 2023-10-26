import { Processing } from '../Processings';
import { Destroyable } from '../Destroyable';
import { Player } from '../Player';
import { ParsedFrame } from './gifuct-js';
import { Event } from '../pipe/Event';
export declare class GifPlayer extends Destroyable {
    private _container;
    _player: Player;
    _gifFrames: import("../ReactiveVariable").ReactiveVariable<ParsedFrame[] | undefined>;
    _gifUrl: import("../ReactiveVariable").ReactiveVariable<string>;
    _gifLoaded: Event<[{
        width: number;
        height: number;
        duration: number;
    }]>;
    _loadGIFFramesProcessing: Processing<ParsedFrame[], void, [string]>;
    constructor(_container: HTMLDivElement);
    set gifUrl(value: string);
    get gifUrl(): string;
    get gifLoaded(): Pick<Event<[{
        width: number;
        height: number;
        duration: number;
    }]>, "empty" | "on" | "disposableOn" | "once" | "disposableOnce" | "off" | "reset" | "destroy">;
    get isGifLoaded(): boolean;
    get gifFrames(): ParsedFrame[] | undefined;
    get player(): Player;
}
