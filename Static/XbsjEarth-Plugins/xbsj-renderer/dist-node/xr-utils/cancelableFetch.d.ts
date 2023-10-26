import { CancelError, CancelResult, SetCancelFunc } from "./cancelablePromise";
/**
 * 可取消可监视进度的fetch
 * @param progressFunc 用来获取下载的进度信息
 * @param args 原始fetch的参数
 */
export declare function cancelableFetch(progressFunc: ((loaded: number, total: number) => void) | undefined, ...args: Parameters<typeof fetch>): [(cancelError?: CancelError) => void, Promise<Response>];
/**
 * 可取消可监视进度的fetch
 * @param cancelResult 用来取消fetch
 * @param progressFunc 用来获取下载的进度信息
 * @param args 原始fetch的参数
 * @example
 * const cancelResult: CancelResult = {};
 * const progressFunc = (loaded: number, total: number) => {
 *     console.log(`loaded: ${loaded} total: ${total} p: ${(loaded/total)*100 | 0}`);
 * }

 * console.log('revocableFetch');
 * revocableFetch(cancelResult, progressFunc, 'http://earthsdk.com/t/videoModels/qiangji/3/obj/3.obj').then(response => {
 *     if (response.ok) {
 *         console.log('ok');
 *     }
 *     return response.text();
 * }).then(text => {
 *     console.log(text);
 * }).catch(error => {
 *     console.log(error);
 * });
 */
export declare function cancelableFetch(setCancelOrCancelResult: CancelResult | SetCancelFunc, progressFunc: ((loaded: number, total: number) => void) | undefined, ...args: Parameters<typeof fetch>): Promise<Response>;
