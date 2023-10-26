import { Destroyable, Event } from 'xbsj-renderer/dist-node/xr-utils';
import * as Cesium from 'cesium';
export declare abstract class CzmBasePrimitive extends Destroyable {
    abstract update(frameState: Cesium.FrameState): void;
}
export interface CzmBasePrimitive {
    show: boolean;
    showChanged: Event<[boolean, boolean]>;
}
