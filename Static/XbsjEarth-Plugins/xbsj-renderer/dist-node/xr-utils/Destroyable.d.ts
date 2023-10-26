export interface Destroyable {
    isDestroyed(): boolean;
    destroy(): undefined;
}
export declare class Destroyable {
    private _disposers?;
    get disposers(): (() => void)[];
    dispose(disposeFunc: () => void): void;
    disposeVar<T extends {
        destroy(): void;
    }>(obj: T): T;
}
