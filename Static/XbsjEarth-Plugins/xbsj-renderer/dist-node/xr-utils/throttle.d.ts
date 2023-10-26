import { StartUpdateFuncType } from "./StartUpdateFunc";
/**
 * 函数节流
 * @param fn 需要节流的函数
 * @param time 毫秒
 * @param startUpdateFunc 更新函数，可以不指定
 * @returns 返回类似这样的数组：[doFunc, cancelFunc]，第一个是截流函数，第二个用来取消
 */
export declare function throttle<T extends (...args: any[]) => void>(fn: T, time: number, startUpdateFunc?: StartUpdateFuncType): [(...args: Parameters<T>) => void, () => void];
