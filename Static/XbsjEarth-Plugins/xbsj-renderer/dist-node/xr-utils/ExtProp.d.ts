/**
 * 给某个对象增加额外的属性
 * @param obj 对象
 * @param propName 属性名称
 * @param propValue 属性值
 * @example
 * // 不需要加类型，会根据clusterPoi自动推断！
 * setExtProp(poiS, 'clusterPoi', clusterPoi);
 */
export declare function setExtProp<T>(obj: Object, propName: string, propValue: T): void;
/**
 * 获取某个对象的额外属性
 * @param obj 需要增加额外属性的对象
 * @param propName 属性名
 * @returns 返回值可能是undefined，说明没有该属性
 * @example
 * // 对象需要加上类名，否则无法识别！
 * const clusterPoi = getExtProp<ClusterPoi>(poiS, 'clusterPoi');
 */
export declare function getExtProp<T>(obj: Object, propName: string): T | undefined;
