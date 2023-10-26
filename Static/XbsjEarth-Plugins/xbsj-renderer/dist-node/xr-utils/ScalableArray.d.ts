/**
 * 为了获取一个可重用的大数组，避免程序中反复创建大数组，导致内存占用过大！
 */
export declare function createScalableArray(): any[];
export declare function destroyScalableArray(scalableArray: Array<any>): void;
