/**
 * 本来想用Observable来检测数组变化的，不过这货考虑了太多，连数组下的对象也监控了，反而不符合我的要求！
 * 只好参考网上的代码改造一下了
 * 代码参考自：https://www.cnblogs.com/aiv367/p/12753340.html
 *
 * 20201203
 * 但是这种方式检测变化时，不能是changes，而只能是一个一个的change，
 * 有一些变化，可能会有多个change，比如第一个change删掉某个元素，第二个change又把某个元素加回去了，那么这个元素就不应该destroy
 * 然而以下这种方式就没法监测了！
 */
export declare function observeArray<T>(array: T[], callback: (changeInfo: ObserveArrayChangeType<T>) => boolean): T[];
export declare type ObserveArrayChangeType<T> = {
    type: 'insert' | 'update' | 'delete';
    index: number;
    value?: T;
    oldValue?: T;
};
