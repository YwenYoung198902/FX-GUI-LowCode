import { DoublyLinkedList, DoublyLinkedListNode } from "./DoublyLinkedList";
interface Listener<T extends any[] = []> {
    func: (...args: T) => void;
    scope?: Object;
    _hasRemoved: boolean;
    _once: boolean;
}
export declare type ListenerHandler<T extends any[] = []> = DoublyLinkedListNode<Listener<T>>;
export declare class ListenerPipe<T extends any[] = []> {
    __dll?: DoublyLinkedList<Listener<T>>;
    __currentListenerStack?: Listener<T> | Listener<T>[];
    constructor();
    get _dll(): DoublyLinkedList<Listener<T>>;
    _pushCurrentListener(listener: Listener<T>): void;
    _popCurrentListener(): void;
    _hasCurrentListener(listener: Listener<T>): boolean;
    do(...args: T): void;
    get empty(): boolean;
    isHandlerValid(handler: ListenerHandler<T>): boolean;
    nextHandler(handler: ListenerHandler<T>): DoublyLinkedListNode<Listener<T>> | undefined;
    prevHandler(handler: ListenerHandler<T>): DoublyLinkedListNode<Listener<T>> | undefined;
    moveAfter(handler: ListenerHandler<T>, nextHandler: ListenerHandler<T>): void;
    moveBefore(handler: ListenerHandler<T>, prevHandler: ListenerHandler<T>): void;
    insertBefore(handler: ListenerHandler<T>, func: (...args: T) => void, scope?: Object, once?: boolean): DoublyLinkedListNode<Listener<T>>;
    insertAfter(handler: ListenerHandler<T>, func: (...args: T) => void, scope?: Object, once?: boolean): DoublyLinkedListNode<Listener<T>>;
    _clearHasRemoved(handler: ListenerHandler<T>): void;
    remove(handler: ListenerHandler<T>): void;
    removeAll(): void;
    push(func: (...args: T) => void, scope?: Object, once?: boolean): DoublyLinkedListNode<Listener<T>>;
    pop(): void;
    shift(): void;
    unshift(func: (...args: T) => void, scope?: Object, once?: boolean): DoublyLinkedListNode<Listener<T>>;
    get tail(): DoublyLinkedListNode<Listener<T>> | undefined;
    get head(): DoublyLinkedListNode<Listener<T>> | undefined;
}
export {};
