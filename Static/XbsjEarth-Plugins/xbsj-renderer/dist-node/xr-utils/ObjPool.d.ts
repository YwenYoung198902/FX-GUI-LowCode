export declare type PoolObj<T> = T & {
    _cid?: number;
};
export declare class ObjPool<T> {
    private _createDefaultFunc?;
    private _destroyFunc?;
    _freeElements: T[];
    _usedElementsCount: number;
    _usedElements?: T[];
    _nextCreateID: number;
    _scratchObjs: T[];
    constructor(_createDefaultFunc?: (() => T) | undefined, _destroyFunc?: ((element: T) => void) | undefined, debug?: boolean);
    get usedElementsCount(): number;
    get freeElementsCount(): number;
    _getCreateID(): number;
    _create(): T;
    create(): T;
    /**
     * 注意返回值不能递归调用！请即时取出变量！
     * @param elementCount
     *
     * @example
     *  // 请这样使用：
     *  // 即时取出变量
     *  const [dir, poiUp, poiRight, poiDirection] = nubmer3ObjPool.multiCreate(4);
     *  // xxx 其他操作
     *  nubmer3ObjPool.destroy(dir, poiUp, poiRight, poiDirection);
     *
     *  // 不要这样使用：
     *  const xx = nubmer3ObjPool.multiCreate(4);
     *  // xxx 如果这里再次调用了nubmer3ObjPool.multiCreate，会导致xx失效！
     *  nubmer3ObjPool.destroy(...xx);
     *
     */
    multiCreate(elementCount: number): readonly T[];
    _destroy(element: T): void;
    destroy(...elements: T[]): void;
}
