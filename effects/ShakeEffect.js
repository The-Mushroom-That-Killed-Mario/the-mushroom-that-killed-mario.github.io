import { forceReflow } from './utils.js';

export class ShakeEffect {
    constructor(container) {
        this.container = container;
    }

    trigger() {
        this.container.classList.remove('shake');
        forceReflow(this.container);
        this.container.classList.add('shake');
    }

    reset() {
        this.container.classList.remove('shake');
    }
}
