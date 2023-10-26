/**
 * 动态增加css样式
 *
 * @param styleText
 * @returns 返回创建的stylesheets
 * @example
 *
 * const styleText = `
 * poi-widget {
 *    position: absolute;
 *    width: 200px;
 *    font-size: 14px;
 *    line-height: 20px;
 *    transform: translate(-100px, 0px);
 *
 * ;
 * addClassStyle(styleText);
 *
 */
export declare function addClassStyle(styleText: string): HTMLStyleElement;
