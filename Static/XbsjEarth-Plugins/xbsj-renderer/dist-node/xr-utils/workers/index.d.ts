import { Destroyable } from '../Destroyable';
export declare function findTransferableObjectsFromArgs(...args: any[]): Transferable[] | undefined;
export declare class SmartWorker extends Destroyable {
    private _worker;
    private _resultEvent;
    private _lastExecId;
    constructor();
    execWorkerFunc(funcName: string, ...args: any[]): Promise<unknown>;
    execWorkerFuncWithTransferableObjects(funcName: string, transferableObjects?: Transferable[], ...args: any[]): Promise<unknown>;
    private _execWorkerFuncWithTransferableObjects;
    execWorkerProgressFunc(funcName: string, progressFunc: ((value: any) => void) | undefined, completeFunc: (value: any) => void, errorFunc: (error: any) => void, ...args: any[]): () => void;
    execWorkerProgressFuncWithTransferableObjects(funcName: string, progressFunc: ((value: any) => void) | undefined, completeFunc: (value: any) => void, errorFunc: (error: any) => void, transferableObjects?: Transferable[], ...args: any[]): () => void;
    private _execWorkerProgressFuncWithTransferableObjects;
    eval(script: string): Promise<unknown>;
    importScripts(jsFilePath: string): Promise<unknown>;
    createGlobalFunc(functon: Function, functionName?: string): Promise<unknown>;
}
