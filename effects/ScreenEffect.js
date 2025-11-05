import { prefersReducedMotion } from './utils.js';
import { VideoLayer } from './VideoLayer.js';
import { FlashEffect } from './FlashEffect.js';
import { ShakeEffect } from './ShakeEffect.js';

export class ScreenEffect {
    constructor({ wrap, video, flash, page, onStart, onEnd }) {
        this.reduced = prefersReducedMotion();
        this.onStart = onStart;
        this.onEnd = onEnd;

        this.videoLayer = new VideoLayer(video, wrap);
        this.flash = new FlashEffect(flash);
        this.shake = new ShakeEffect(page);

        this._onVideoEnd = this._onVideoEnd.bind(this);
        this.videoLayer.onEnd(this._onVideoEnd);
    }

    async play() {
        if (this.reduced) return;
        await this.videoLayer.play();
        this.flash.trigger();
        this.shake.trigger();
        this.onStart?.();
    }

    reset() {
        this.videoLayer.reset();
        this.flash.reset();
        this.shake.reset();
    }

    _onVideoEnd() {
        this.reset();
        this.onEnd?.();
    }

    destroy() {
        this.videoLayer.offEnd(this._onVideoEnd);
        this.reset();
    }
}
