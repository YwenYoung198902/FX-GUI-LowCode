import { Event } from "../pipe/Event";
import { Destroyable } from "../Destroyable";
import { CancelError } from "../cancelablePromise";
export declare type Status = 'Initial' | 'Running' | 'Error' | 'Cancelled' | 'Cancelling' | 'Completed';
export declare type StartProcessingFuncType<CompleteValueType, ProgressValueType, StartValueType extends any[]> = (options: {
    readonly progressFunc: (value: ProgressValueType) => void;
    readonly completeFunc: (value: CompleteValueType) => void;
    readonly errorFunc: (error: any) => void;
    readonly cancelFunc: (cancelError?: CancelError) => Promise<void> | undefined;
    readonly processingID: number;
}, ...args: StartValueType) => ((cancelError?: CancelError) => Promise<void> | void);
export declare type FinishedResultType<CompleteValueType> = {
    status: 'Error';
    error: any;
} | {
    status: 'Cancelled';
    cancelError?: CancelError;
} | {
    status: 'Completed';
    value: CompleteValueType;
};
/**
 * 状态管理 Initial -> Running -> [Cancelling] -> Error/Cancelled/Completed -> Initial -> Running -> [Cancelling] -> Error/Cancelled/Completed -> ...
 * Cancelling有可能是一个过程，需要时间等待结束
 * Error/Cancelled/Completed 理论上只能选择其一！
 */
export declare class Processing<CompleteValueType, ProgressValueType = void, StartValueType extends any[] = []> extends Destroyable {
    private _startProcessingFunc;
    startFunc?: ((...args: StartValueType) => void) | undefined;
    progressFunc?: ((value: ProgressValueType) => void) | undefined;
    completeFunc?: ((value: CompleteValueType) => void) | undefined;
    cancelFunc?: ((cancelError?: CancelError | undefined) => void) | undefined;
    cancelledFunc?: ((cancelError?: CancelError | undefined) => void) | undefined;
    errorFunc?: ((error: any) => void) | undefined;
    finishedFunc?: ((finishedResult: FinishedResultType<CompleteValueType>) => void) | undefined;
    private __status;
    private _statusChangedEvent?;
    private _forceCancelFunc?;
    private _startEvent?;
    private _progressEvent?;
    private _completeEvent?;
    private _cancelEvent?;
    private _cancelledEvent?;
    private _errorEvent?;
    private _finieshedEvent?;
    private _processingID;
    /**
     *
     * @param _startProcessingFunc 启动进度的回到函数
     * @param startFunc 进度启动的回调函数，在用户调用start方法时立即执行
     * @param progressFunc 进度过程的回调函数，在执行过程中调用，也可能不调用
     * @param completeFunc 进度结束时的回调函数，表示任务完成
     * @param cancelFunc 进度被取消时的回调函数，表示任务被取消
     * @param errorFunc 进度执行过程中出现错误，表示任务报错终止
     * @param finishedFunc 结束回调，结果可能是完成、错误、取消
     */
    constructor(_startProcessingFunc: StartProcessingFuncType<CompleteValueType, ProgressValueType, StartValueType>, startFunc?: ((...args: StartValueType) => void) | undefined, // 启动
    progressFunc?: ((value: ProgressValueType) => void) | undefined, // 进度
    completeFunc?: ((value: CompleteValueType) => void) | undefined, // 完成及结果
    cancelFunc?: ((cancelError?: CancelError | undefined) => void) | undefined, // 取消回调
    cancelledFunc?: ((cancelError?: CancelError | undefined) => void) | undefined, // 取消回调
    errorFunc?: ((error: any) => void) | undefined, // 错误回调
    finishedFunc?: ((finishedResult: FinishedResultType<CompleteValueType>) => void) | undefined);
    get startEvent(): Event<StartValueType>;
    get progressEvent(): Event<[ProgressValueType]>;
    get completeEvent(): Event<[CompleteValueType]>;
    get cancelEvent(): Event<[void | CancelError]>;
    get cancelledEvent(): Event<[void | CancelError]>;
    get errorEvent(): Event<[any]>;
    private _completeFunc;
    private _cancelFunc;
    private _cancelledFunc;
    private _errorFunc;
    private _progressFunc;
    private _startFunc;
    protected set _status(value: Status);
    protected get _status(): Status;
    get processingID(): number;
    get statusChangedEvent(): Event<[Status, Status]>;
    /**
     * 如果是完成状态，再重置为初始化状态，但是需要注意，如果是Cancelling状态，则无法完成重置！
     * @param cancelError 正在运行的事件，会执行取消操作，cancelError是可以写入的取消原因
     */
    reset(cancelError?: CancelError): void;
    /**
     * 当前的状态
     */
    get status(): Status;
    /**
     * 取消操作，需要注意必须是运行状态才可以取消，否则会报错！
     * @param cancelError
     */
    cancel(cancelError?: CancelError, processingID?: number): Promise<void> | undefined;
    _cancel(processingID: number, cancelError?: CancelError): Promise<void> | undefined;
    /**
     * 必须是初始化状态才可以启动！
     * @returns -1表示没有启动成功，否则表示启动后的processingID
     */
    start(...args: StartValueType): number | undefined;
    /**
     * 重新启动，如果之前是结束状态，则会自动重置状态
     * @returns -1表示没有启动成功，否则表示启动后的processingID
     */
    restart(cancelError?: CancelError, ...args: StartValueType): number | undefined;
    /**
     * 是否能够完成
     */
    get isCompleted(): boolean;
    /**
     * 是否已经取消
     */
    get isCancelled(): boolean;
    /**
     * 是否正在取消
     */
    get isCancelling(): boolean;
    /**
     * 是否发生错误而终止
     */
    get isError(): boolean;
    /**
     * 是否处于初始化状态
     */
    get isInitial(): boolean;
    /**
     * 是否正在运行
     */
    get isRunning(): boolean;
    /**
     * 是否已经结束，结束有三种可能即：被取消、已完成、错误终止
     */
    get isFinished(): boolean;
}
