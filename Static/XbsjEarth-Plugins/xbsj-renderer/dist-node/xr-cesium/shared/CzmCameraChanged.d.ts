import * as Cesium from 'cesium';
import { Event, Destroyable } from 'xbsj-renderer/dist-node/xr-utils';
export declare class CzmCameraChanged extends Destroyable {
    private _scene;
    _originViewMatrix: Cesium.Matrix4;
    _originProjMatrix: Cesium.Matrix4;
    _changed: Event;
    constructor(_scene: Cesium.Scene);
    _update(): void;
    get changed(): Event<[]>;
}
