import { ListenerHandler } from './ListenerPipe';
export declare class SmartListenerHandler<T extends any[] = []> {
    _listenerHandler?: ListenerHandler<T>;
    _cid?: number;
    _reset(listenerHandler?: ListenerHandler<T>, cid?: number): void;
    clone(target?: SmartListenerHandler<T>): SmartListenerHandler<T>;
    get valid(): boolean;
}
