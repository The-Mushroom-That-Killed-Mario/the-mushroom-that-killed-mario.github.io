// Экспортируем класс, инкапсулирующий логику экранного эффекта
export class ScreenEffect {
    /**
     * @param {Object} opts
     * @param {HTMLElement} opts.wrap   — контейнер видео-слоя
     * @param {HTMLVideoElement} opts.video
     * @param {HTMLElement} opts.flash
     * @param {HTMLElement} opts.page   — корневой контейнер контента (для тряски)
     * @param {boolean} [opts.autoHide=true] — автоматически прятать слой по окончании видео
     * @param {(ev?:Event)=>void} [opts.onStart]
     * @param {(ev?:Event)=>void} [opts.onEnd]
     */
    constructor(opts) {
        this.wrap  = opts.wrap;
        this.video = opts.video;
        this.flash = opts.flash;
        this.page  = opts.page;
        this.onStart = opts.onStart;
        this.onEnd   = opts.onEnd;
        this.autoHide = opts.autoHide ?? true;

        // Уважим системные настройки "уменьшить анимации"
        this.prefersReduced =
            window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

        this._onEnded = this._onEnded.bind(this);
        this._attach();
    }

    _attach() {
        if (this.autoHide) this.video.addEventListener('ended', this._onEnded);
    }
    _detach() {
        this.video.removeEventListener('ended', this._onEnded);
    }

    async play() {
        if (this.prefersReduced) return; // без эффекта

        // Показать слой
        this.wrap.classList.add('active');

        // Начать с начала
        try { this.video.currentTime = 0; } catch {}

        // Попытка автоплея
        try {
            await this.video.play();
            this.video.removeAttribute('controls');
        } catch {
            // если автоплей заблокирован — показать контролы
            this.video.setAttribute('controls', 'controls');
        }

        // Вспышка
        this.flash.classList.remove('blast');
        void this.flash.offsetWidth; // reflow для перезапуска
        this.flash.classList.add('blast');

        // Тряска
        this.page.classList.remove('shake');
        void this.page.offsetWidth;
        this.page.classList.add('shake');

        this.onStart?.();
    }

    reset() {
        try { this.video.pause(); } catch {}
        this.wrap.classList.remove('active');
        this.flash.classList.remove('blast');
        this.page.classList.remove('shake');
        this.video.removeAttribute('controls');
    }

    _onEnded(ev) {
        this.reset();
        this.onEnd?.(ev);
    }

    destroy() {
        this.reset();
        this._detach();
    }
}
