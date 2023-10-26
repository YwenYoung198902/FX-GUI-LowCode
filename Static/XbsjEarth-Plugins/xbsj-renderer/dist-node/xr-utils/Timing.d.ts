import { Processing } from "./Processings/Processing";
import { StartUpdateFuncType } from "./StartUpdateFunc";
declare class TimingBase {
    startTime: number;
    duration: number;
    delay: number;
    proccessFunc?: ((v: ProcessType) => void) | undefined;
    completeFunc?: (() => void) | undefined;
    _processData: ProcessType;
    _lastUpdateTimeStamp: number;
    constructor(startTime?: number, duration?: number, delay?: number, proccessFunc?: ((v: ProcessType) => void) | undefined, completeFunc?: (() => void) | undefined);
    update(timeStamp: number): void;
    start(): void;
}
export declare type ProcessType = {
    ratio: number;
    timeStamp: number;
    timeStampFromStart: number;
    timeStampFromLastUpdate: number;
};
export declare class Timing extends Processing<void, ProcessType> {
    _base: TimingBase;
    duration: number;
    delay: number;
    startUpdateFunc: StartUpdateFuncType | undefined;
    constructor(duration?: number, delay?: number, // 延迟执行时间 单位ms
    startUpdateFunc?: StartUpdateFuncType | undefined);
    get startTime(): number;
}
export {};
