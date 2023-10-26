import { CanvasPrimitivesContext, Destroyable, Event } from 'xbsj-renderer/dist-node/xr-utils';
import * as Cesium from 'cesium';
import { CzmCameraChanged } from '../shared/CzmCameraChanged';
/**
 * Cesium下使用海量POI的环境，注意需要配置事件响应！具体参见示例代码！
 *
 * @example
 * const mkzyPoisContext = new CzmPoisContext(earth.czm.viewer);
 * this.dispose(() => mkzyPoisContext.destroy());
 *
 * const pointerClick = new PointerClick(earth.czm.scene.canvas.parentElement as HTMLDivElement);
 * this.dispose(() => pointerClick.destroy());
 * this.dispose(pointerClick.clickEvent.disposableOn((left, top, pointerEvent) => {
 *     mkzyPoisContext.pointerClick(left, top, pointerEvent);
 * }));
 * this.dispose(pointerClick.dbclickEvent.disposableOn((left, top, pointerEvent) => {
 *     mkzyPoisContext.pointerDbclick(left, top, pointerEvent);
 * }));
 * this.dispose(pointerClick.downEvent.disposableOn((left, top, pointerEvent) => {
 *     mkzyPoisContext.pointerDown(left, top, pointerEvent);
 * }));
 * this.dispose(pointerClick.upEvent.disposableOn((left, top, pointerEvent) => {
 *     mkzyPoisContext.pointerUp(left, top, pointerEvent);
 * }));
 * this.dispose(pointerClick.moveEvent.disposableOn((left, top, pointerEvent) => {
 *     mkzyPoisContext.pointerMove(left, top, pointerEvent);
 * }));
 *
 */
export declare class CzmPoisContext extends Destroyable {
    _viewer: Cesium.Viewer;
    private _useInnerInteraction;
    private _divContainer;
    private _canvasPrimitivesContext;
    private _isPointOccludedByEarth;
    private _poiClickedEvent?;
    private _clickEvent;
    private _dbclickEvent;
    private _downEvent;
    private _upEvent;
    private _moveEvent;
    private _cameraChanged;
    /**
     *
     * @param _viewer
     * @param _useInnerInteraction
     */
    constructor(_viewer: Cesium.Viewer, _useInnerInteraction?: boolean);
    /**
     * 是否使用内部的交互操作，此值为只读属性，需要在构造时确定好
     * 如果不使用内部的交互操作，需要自行补上交互操作
     */
    get useInnerInteraction(): boolean;
    get divContainer(): HTMLDivElement;
    get canvasPrimitivesContext(): CanvasPrimitivesContext;
    get viewer(): Cesium.Viewer;
    /**
     * 相机状态变化时，会触发此事件
     */
    get cameraChanged(): CzmCameraChanged;
    /**
     * 是否被地球遮挡
     * @param cartesian
     * @returns
     */
    isPointOccludedByEarth(cartesian: Cesium.Cartesian3): boolean;
    /**
     * 当某个poi被点击时此处此事件
     */
    get poiClickedEvent(): Event<[boolean]>;
    pointerClick(this: CzmPoisContext, ...args: Parameters<typeof this._clickEvent.emit>): void;
    pointerDbclick(this: CzmPoisContext, ...args: Parameters<typeof this._dbclickEvent.emit>): void;
    pointerDown(this: CzmPoisContext, ...args: Parameters<typeof this._downEvent.emit>): void;
    pointerUp(this: CzmPoisContext, ...args: Parameters<typeof this._upEvent.emit>): void;
    pointerMove(this: CzmPoisContext, ...args: Parameters<typeof this._moveEvent.emit>): void;
}
