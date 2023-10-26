import { CancelError } from '../cancelablePromise';
import { Event, Listener } from '../pipe/Event';
import { Destroyable } from '../Destroyable';
import { Processing } from './Processing';
export declare function getPromiseFromEvent<T extends any[]>(event: Event<T>): [(error: CancelError) => void, Promise<T>];
export declare function getEventFromPromise<T>(promise: Promise<T>): [Event<[T]>, Event<[any]>];
export declare function getProcessingFromPromise<T>(promise: Promise<T>): Processing<T, void, []>;
export declare function getPromiseFromProcessing<CompleteValueType, StartValueType extends any[] = []>(processing: Processing<CompleteValueType, any, StartValueType>, ...args: StartValueType): [() => void, Promise<CompleteValueType>];
export declare class NextAnimationFrame<CompleteValueType = void, ProgressValueType = void, StartValueType extends any[] = []> extends Processing<CompleteValueType, ProgressValueType, StartValueType> {
    constructor(doFunc: (...args: StartValueType) => CompleteValueType);
}
export declare class NextMicroTask<CompleteValueType = void, ProgressValueType = void, StartValueType extends any[] = []> extends Processing<CompleteValueType, ProgressValueType, StartValueType> {
    constructor(doFunc: (...args: StartValueType) => CompleteValueType);
}
export declare class NextMicroTaskEvent extends Destroyable {
    private _event;
    constructor(...events: Listener<any[]>[]);
    get event(): Event<[]>;
}
