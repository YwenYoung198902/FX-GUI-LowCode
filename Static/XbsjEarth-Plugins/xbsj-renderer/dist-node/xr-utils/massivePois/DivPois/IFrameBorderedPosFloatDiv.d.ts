import { Event } from '../../pipe/Event';
import { BorderedPosFloatDiv } from "./BorderedPosFloatDiv";
export declare class IFrameBorderedPosFloatDiv extends BorderedPosFloatDiv {
    private _iframe;
    private _iframeMessageEvent?;
    constructor();
    reset(): void;
    set src(value: string);
    get src(): string;
    get iframe(): HTMLIFrameElement;
    /**
     * iframe窗口内需要通过 parent.postMessage(xxx)来把消息传递给父窗口！
     */
    get iframeMessageEvent(): Event<[MessageEvent]>;
}
