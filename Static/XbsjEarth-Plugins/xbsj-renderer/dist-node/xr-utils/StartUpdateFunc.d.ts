/**
 * 检测requestAnimationFrame提供的时间是否准确！如果为false，说明requestAnimationFrame回调函数提供的时间有误！
 *
 * @example
 * function requestAnimationFrameTimeStampTest() {
 *     return new Promise((resolve, reject) => {
 *         const startTimeStamp = performance.now();
 *         requestAnimationFrame(timeStamp => resolve(timeStamp > startTimeStamp));
 *     });
 * }
 * requestAnimationFrameTimeStampTest().then(console.log);
 */
export declare function requestAnimationFrameTimeStampTest(): Promise<unknown>;
export declare const defaultStartUpdateFunc: StartUpdateFuncType;
export declare type StartUpdateFuncType = (updateFunc: (timeStamp: number) => void) => () => void;
