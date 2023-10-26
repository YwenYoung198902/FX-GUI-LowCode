import { ListenerPipe } from './ListenerPipe';
import { SmartListenerHandler } from './SmartListenerHandler';
export declare class SmartListenerPipe<T extends any[] = []> {
    __pipe?: ListenerPipe<T>;
    get _pipe(): ListenerPipe<T>;
    get empty(): boolean;
    do(...args: T): void;
    isHandlerValid(handler: SmartListenerHandler<T>): boolean;
    moveAfter(handler: SmartListenerHandler<T>, nextHandler: SmartListenerHandler<T>): void;
    moveBefore(handler: SmartListenerHandler<T>, prevHandler: SmartListenerHandler<T>): void;
    insertBefore(handler: SmartListenerHandler<T>, func: (...args: T) => void, scope?: Object, once?: boolean, scratchSmartListenerHandler?: SmartListenerHandler<T>): SmartListenerHandler<T>;
    insertAfter(handler: SmartListenerHandler<T>, func: (...args: T) => void, scope?: Object, once?: boolean, scratchSmartListenerHandler?: SmartListenerHandler<T>): SmartListenerHandler<T>;
    remove(handler: SmartListenerHandler<T>): void;
    removeAll(): void;
    push(func: (...args: T) => void, scope?: Object, once?: boolean, scratchSmartListenerHandler?: SmartListenerHandler<T>): SmartListenerHandler<T>;
    pop(): void;
    shift(): void;
    unshift(func: (...args: T) => void, scope?: Object, once?: boolean, scratchSmartListenerHandler?: SmartListenerHandler<T>): SmartListenerHandler<T>;
    getTail(scratchSmartListenerHandler?: SmartListenerHandler<T>): SmartListenerHandler<T> | undefined;
    getHead(scratchSmartListenerHandler?: SmartListenerHandler<T>): SmartListenerHandler<T> | undefined;
}
