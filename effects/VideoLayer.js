export class VideoLayer {
    constructor(video, wrap) {
        this.video = video;
        this.wrap = wrap;
        this.autoHide = true;
    }

    async play() {
        this.wrap.classList.add('active');
        try { this.video.currentTime = 0; } catch {}
        try {
            await this.video.play();
            this.video.removeAttribute('controls');
        } catch {
            this.video.setAttribute('controls', 'controls');
        }
    }

    pause() {
        try { this.video.pause(); } catch {}
    }

    reset() {
        this.pause();
        this.wrap.classList.remove('active');
        this.video.removeAttribute('controls');
    }

    onEnd(cb) {
        this.video.addEventListener('ended', cb);
    }

    offEnd(cb) {
        this.video.removeEventListener('ended', cb);
    }
}
