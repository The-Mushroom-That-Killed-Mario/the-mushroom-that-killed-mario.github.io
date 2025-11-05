import { forceReflow } from './utils.js';

export class FlashEffect {
    constructor(el) {
        this.el = el;
    }

    trigger() {
        this.el.classList.remove('blast');
        forceReflow(this.el);
        this.el.classList.add('blast');
    }

    reset() {
        this.el.classList.remove('blast');
    }
}
