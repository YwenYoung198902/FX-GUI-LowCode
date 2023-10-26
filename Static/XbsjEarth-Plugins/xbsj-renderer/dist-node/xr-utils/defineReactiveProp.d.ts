/**
 * 用来扩展某个对象的属性，同时配置属性的Changed事件
 *
 * @param classObj 需要扩展的对象
 * @param propName 扩展对象的属性名字，只能是字符串
 * @param defaultValue 属性的默认值
 * @example
 *
 * // 示例1，常规示例
 * export interface KulunFaceModel {
 *     showFace: boolean;
 *     readonly showFaceChanged: Event<[boolean, boolean]>;
 * }
 * defineReactiveProp(KulunFaceModel, 'showFace', true);
 *
 * // 示例2，带数组的比较运算
 * export interface MkyDeviceModel {
 *     position: [number, number, number];
 *     readonly positionChanged: Event<[[number, number, number], [number, number, number]]>;
 * }
 * defineReactiveProp(MkyDeviceModel, 'position', [0, 0, 0], (a, b) => a.every((e, i) => e === b[i]));
 *
 * // 示例3，带JSON的比较运算
 * export interface ProjectConfig {
 *     中心线模型urls: string[];
 *     readonly 中心线模型urlsChanged: Event<[string[], string[]]>;
 * }
 * defineReactiveProp<string[]>(ProjectConfig, '中心线模型urls', [], (a, b) => JSON.stringify(a) === JSON.stringify(b));
 *
 */
export declare function defineReactiveProp<PropType>(classObj: {
    prototype: Object;
}, propName: string, defaultValue: PropType, equalsFunc?: (a: PropType, b: PropType) => boolean): void;
