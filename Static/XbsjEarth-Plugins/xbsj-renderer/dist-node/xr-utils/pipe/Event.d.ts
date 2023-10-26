import { ListenerPipe } from './ListenerPipe';
import { SmartListenerHandler } from './SmartListenerHandler';
export declare class EventListenerHandler<T extends any[] = []> extends SmartListenerHandler<T> {
}
export declare class Event<T extends any[] = []> {
    private __pipe?;
    private get _pipe();
    get empty(): boolean;
    emit(...args: T): void;
    on(func: (...args: T) => void, scope?: Object, first?: boolean, handler?: EventListenerHandler<T>): EventListenerHandler<T>;
    disposableOn(func: (...args: T) => void, scope?: Object, first?: boolean, handler?: EventListenerHandler<T>): () => void;
    once(func: (...args: T) => void, scope?: Object, first?: boolean, handler?: EventListenerHandler<T>): EventListenerHandler<T>;
    disposableOnce(func: (...args: T) => void, scope?: Object, first?: boolean, handler?: EventListenerHandler<T>): () => void;
    off(handler: EventListenerHandler<T>): void;
    reset(): void;
    destroy(): void;
}
export declare type Listener<T extends any[] = []> = Omit<Event<T>, 'emit'>;
export declare type Emitter<T extends any[] = []> = Pick<Event<T>, 'emit'>;
export declare type EventForTest<T extends any[] = []> = {
    _pipe: ListenerPipe<T>;
} & Omit<Event<T>, '_pipe'>;
