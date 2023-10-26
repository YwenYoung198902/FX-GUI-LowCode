/**
 * 获取当前事件监听者的坐标位置
 * 因为HTML没有获取事件监听者坐标的方法，offsetX是事件发起者的坐标，clientX是浏览器窗口的坐标
 * @param mosueEvent
 * @returns
 */
export declare function getDomEventCurrentTargetPos(mosueEvent: MouseEvent): number[];
