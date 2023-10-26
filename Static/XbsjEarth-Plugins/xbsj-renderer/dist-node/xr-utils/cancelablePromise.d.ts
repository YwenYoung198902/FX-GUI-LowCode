export declare class CancelError extends Error {
}
export interface CancelResult {
    cancelFunc?: (cancelError?: CancelError) => void;
}
export declare type SetCancelFunc = (cancelFunc: (cancelError?: CancelError) => void) => void;
export declare function _executeSetCancelFuncOrCancelResult(setCancelOrCancelResult: CancelResult | SetCancelFunc, cancelFunc: (cancelError?: CancelError) => void): void;
export declare type PromiseExecutorType<T> = (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void;
/**
 * revocablePromise可取消的Promise
 * @param promiseOrExecutor
 */
export declare function cancelablePromise<T>(promiseOrExecutor: Promise<T> | PromiseExecutorType<T>): [((cancelError?: CancelError | undefined) => void), Promise<T>];
/**
 * revocablePromise可取消的Promise
 * @param cancelResult
 * @param promiseOrExecutor
 * @example
 *  // !!! 注意事项：当执行取消操作时，catch会捕获CancelError，这不是真正的错误，只是Promise需要一个出口！
 *  revocablePromise(cancelResult, response.json()).then(json => {
 *      // response.json().then(json => {
 *      const tileset = json as Tileset;
 *      if (!tileset) {
 *          throw new Error('json parse error!');
 *      }

 *      // 避免根节点有一个很大的偏移，导致看不到！只在第一个节点有用
 *      if (_ignoreRootTransform) {
 *          tileset.root.transform = undefined;
 *      }

 *      try {
 *          setTilesetBaseUri(tileset, getBaseUri(uri) + '/');
 *          setTileContentTileset(tileContent, tileset);
 *          // computeTileChildrenTransformToRoots(tile);
 *          prepareTiles(_tile);
 *      } catch (error) {
 *          throw new Error('LoadingError');
 *      }
 *      progressFunc(1.0);
 *      completeFunc();
 *  }).catch(error => {
 *      if (!(error instanceof CancelError)) {
 *          errorFunc(error);
 *      }
 *  });
 */
export declare function cancelablePromise<T>(setCancelOrCancelResult: CancelResult | SetCancelFunc, promiseOrExecutor: Promise<T> | PromiseExecutorType<T>): Promise<T>;
export declare type RegisterCancelFuncType = (cancelFunc: () => void) => void;
declare type InnerOptionsType = {
    cancelCheck: () => void;
    registerCancelFunc: RegisterCancelFuncType;
};
/**
 *
 * @param executor 原始async函数
 * @param args 调用原始async函数使用的参数
 */
export declare function wrapAsyncFuncToCancelablePromise<T>(executor: (innerOptions: InnerOptionsType, ...args: any[]) => Promise<T>, ...args: any[]): [((cancelError?: CancelError | undefined) => void), Promise<T>];
/**
 *
 * @param cancelResult 用来取消
 * @param executor 原始async函数
 * @param args 调用原始async函数使用的参数
 * @example
 * const cancelResult: CancelResult = {};
 * // cancelCheck用来监测当前的工作是否已经取消，如果取消了，则throw错误
 * // registerCancelFunc 用来获取需要执行的主动取消函数
 * wrapAsyncFuncToCancelablePromise(cancelResult, async ({cancelCheck, registerCancelFunc}) => {
 *     console.log('1');
 *     cancelCheck();
 *     const cancelResult: CancelResult = {};
 *     const p = sleep(5000, cancelResult);
 *     cancelResult.cancelFunc && registerCancelFunc(cancelResult.cancelFunc);
 *     await p;

 *     // await sleep(5000);
 *     console.log('2');
 *     cancelCheck();
 *     return 3;
 * }).then(console.log).catch(error => {
 *     if (error instanceof CancelError) {
 *         console.log('取消。。。');
 *     }
 * });
 */
export declare function wrapAsyncFuncToCancelablePromise<T>(setCancelOrCancelResult: CancelResult | SetCancelFunc, executor: (innerOptions: InnerOptionsType, ...args: any[]) => Promise<T>, ...args: any[]): Promise<T>;
export {};
