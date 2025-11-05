import { ScreenEffect } from './effects/ScreenEffect.js';

const fx = new ScreenEffect({
    wrap:  document.getElementById('bgWrap'),
    video: document.getElementById('bgVideo'),
    flash: document.getElementById('flash'),
    page:  document.getElementById('page'),
});

const btn = document.getElementById('nukeBtn');
const reset = document.getElementById('resetBtn');

btn.addEventListener('click', () => fx.play());
btn.addEventListener('keydown', e => {
    if (['Enter',' '].includes(e.key)) { e.preventDefault(); fx.play(); }
});
reset.addEventListener('click', () => fx.reset());
window.addEventListener('beforeunload', () => fx.destroy());
