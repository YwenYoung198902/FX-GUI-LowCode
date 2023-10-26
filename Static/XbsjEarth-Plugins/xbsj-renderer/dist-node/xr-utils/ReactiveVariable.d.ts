import { Destroyable } from "./Destroyable";
import { Event } from './pipe/Event';
export declare class ReactiveVariable<T> extends Destroyable {
    private _value;
    private _equalsFunc?;
    private _assignFunc?;
    _changed?: Event<[T, T]>;
    constructor(_value: T, _equalsFunc?: ((a: T, b: T) => boolean) | undefined, _assignFunc?: ((newValue: T, target?: T | undefined) => T) | undefined);
    set value(value: T);
    get value(): T;
    get changed(): Pick<Event<[T, T]>, "empty" | "on" | "disposableOn" | "once" | "disposableOnce" | "off" | "reset" | "destroy">;
}
export declare function react<T>(defaultValue: T, equalsFunc?: (a: T, b: T) => boolean, assignFunc?: (newValue: T, target?: T) => T): ReactiveVariable<T>;
