import { Destroyable } from '../../Destroyable';
import { Event } from '../../pipe/Event';
import { CanvasPrimitivesContext } from './CanvasPrimitivesContext';
export declare abstract class CanvasPrimitive extends Destroyable {
    protected _canvasPrimitivesContext: CanvasPrimitivesContext;
    protected _needRedrawEvent?: Event;
    protected _needPickRedrawEvent?: Event;
    private _id;
    protected _clickEvent?: Event<[number, number, string, CanvasPrimitive]>;
    protected _dbclickEvent?: Event<[number, number, string, CanvasPrimitive]>;
    protected _actived: boolean;
    protected _activedChanged?: Event<[boolean, CanvasPrimitive]>;
    protected _hovered: boolean;
    protected _hoveredChanged?: Event<[boolean, CanvasPrimitive]>;
    protected _selected: boolean;
    protected _selectedChanged?: Event<[boolean, CanvasPrimitive]>;
    private _opacity;
    protected _opacityChanged?: Event<[number, CanvasPrimitive]>;
    protected _show: boolean;
    protected _showChanged?: Event<[boolean, CanvasPrimitive]>;
    constructor(_canvasPrimitivesContext: CanvasPrimitivesContext, options?: {
        needRedraw?: boolean;
        needPickRedraw?: boolean;
    });
    /**
     * 获取id
     */
    get id(): string;
    /**
     * 获取poi所属的管理器
     */
    get context(): CanvasPrimitivesContext;
    /**
     * 需要重绘
     */
    needRedraw(): void;
    /**
     * 需要拾取重绘
     */
    needPickRedraw(): void;
    /**
     * 获取深度值，用来进行排序和比较
     * 此方法需要子类需要自行实现
     */
    abstract get depth(): number;
    /**
     * 该函数仅仅供CanvasPoisManager内部调用，其他地方不能使用！
     * 此方法需要子类需要自行实现
     * @param ctx
     */
    abstract draw(ctx: CanvasRenderingContext2D): void;
    /**
     * 该函数仅仅供CanvasPoisManager内部调用，其他地方不能使用！
     * 此方法需要子类需要自行实现
     * @param ctx
     * @param createPickColor
     */
    abstract drawForPick(ctx: CanvasRenderingContext2D, createPickColor: (tag: string) => string): void;
    /**
     * 鼠标点击触发的事件
     */
    get clickEvent(): Event<[number, number, string, CanvasPrimitive]>;
    /**
     * 鼠标点击触发的事件
     */
    get dbclickEvent(): Event<[number, number, string, CanvasPrimitive]>;
    /**
     * 鼠标在图元上按下还没有抬起时的状态
     */
    set actived(value: boolean);
    get actived(): boolean;
    get activedChanged(): Event<[boolean, CanvasPrimitive]>;
    /**
     * 鼠标悬停在图标之上时的状态
     */
    set hovered(value: boolean);
    get hovered(): boolean;
    get hoveredChanged(): Event<[boolean, CanvasPrimitive]>;
    /**
     * 鼠标悬停在图标之上时的状态
     */
    set selected(value: boolean);
    get selected(): boolean;
    get selectedChanged(): Event<[boolean, CanvasPrimitive]>;
    set opacity(value: number);
    get opacity(): number;
    get opacityChanged(): Event<[number, CanvasPrimitive]>;
    set show(value: boolean);
    get show(): boolean;
    get showChanged(): Event<[boolean, CanvasPrimitive]>;
}
