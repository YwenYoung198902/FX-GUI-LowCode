import { CancelAndPromise } from './Processings/ProcessingStarter';
import { CancelResult, SetCancelFunc } from "./cancelablePromise";
export declare function sleep(time: number, setCancelOrCancelResultOrNeedCancelRet: true): CancelAndPromise<void>;
export declare function sleep(time: number, setCancelOrCancelResultOrNeedCancelRet?: CancelResult | SetCancelFunc | false): Promise<void>;
