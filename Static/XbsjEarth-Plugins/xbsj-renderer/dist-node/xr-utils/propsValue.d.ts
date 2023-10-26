/**
 * 获取一个对象的内部属性
 * @param obj
 * @param props
 */
export declare function getValueFromProps<T = any>(obj: {
    [k: string]: any;
}, props: string[]): T | undefined;
/**
 * 设置一个对象的内部属性
 * @param obj
 * @param props
 * @param value
 */
export declare function setValueFromProps<T>(obj: {
    [k: string]: any;
}, props: string[], value: T): void;
