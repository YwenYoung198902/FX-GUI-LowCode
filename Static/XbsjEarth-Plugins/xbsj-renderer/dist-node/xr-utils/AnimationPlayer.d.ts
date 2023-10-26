import { Animation, Channel } from "./Animation";
import { Destroyable } from "./Destroyable";
import { Event } from "./pipe";
import { Player } from "./Player";
export declare class AnimationPlayer extends Destroyable {
    _animation: Animation;
    _player: Player;
    _selectedChannel?: Channel;
    _selectedChannelChanged?: Event<[Channel | undefined, Channel | undefined]>;
    constructor(duration?: number);
    get animation(): Animation;
    get player(): Player;
    get selectedChannelChanged(): Event<[Channel | undefined, Channel | undefined]>;
    set selectedChannel(value: Channel | undefined);
    get selectedChannel(): Channel | undefined;
    _initAnimation(): void;
    addChannel(): Channel;
    removeChannel(): void;
    raiseChannel(channel: Channel): void;
    lowerChannel(channel: Channel): void;
    destroyAllChannels(): void;
}
