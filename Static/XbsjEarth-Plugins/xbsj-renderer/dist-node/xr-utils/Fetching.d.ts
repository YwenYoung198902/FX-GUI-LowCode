import { Processing } from "./Processings/Processing";
/**
 * 对fetch的封装，提供状态管理和事件回调
 *
 * @example
 * const f = new Fetching('http://127.0.0.1:85/NoLod_0.b3dm');
 * f.cancelFunc = cancelError => {
 *     console.log(`cancel error: ${cancelError}`);
 * };
 * f.errorFunc = error => {
 *     console.log(`error: ${error}`);
 * };
 * f.progressFunc = ({loaded, total}) => {
 *     console.log(`progress: ${loaded}/${total}`);
 * }
 * f.statusChangedEvent.disposableOn((value, oldValue) => {
 *     console.log(`status changed: ${value}`);
 * });
 * f.startEvent.disposableOn(() => {
 *     console.log(`start`);
 * });
 * f.completeEvent.disposableOn(() => {
 *     console.log(`completed`);
 * });

 * f.start();
 * // f.cancel();
 */
export declare class Fetching<T> extends Processing<T, {
    loaded: number;
    total: number;
}, Parameters<typeof fetch> | []> {
    private _fetchArgs?;
    /**
     *
     * @param args 参数和fetch的参数保持一致
     */
    constructor(completePromiseFunc: (response: Response) => Promise<T>, ...fetchArgs: Parameters<typeof fetch> | []);
    get fetchArgs(): [RequestInfo, (RequestInit | undefined)?] | undefined;
}
