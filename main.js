import { ScreenEffect } from './effects/ScreenEffect.js';

const video = document.getElementById('bgVideo');
const wrap  = document.getElementById('bgWrap');
const flash = document.getElementById('flash');
const page  = document.getElementById('page');

const btn   = document.getElementById('nukeBtn');
const reset = document.getElementById('resetBtn');

const countdown     = document.getElementById('countdown');
const countdownTime = document.getElementById('countdownTime');

const fx = new ScreenEffect({ wrap, video, flash, page });

let isCounting = false;
let timerId = null;

function showCountdown(n=3) {
    countdownTime.textContent = String(n);
    countdown.classList.add('show');
}
function hideCountdown() {
    countdown.classList.remove('show');
}
function ensureVideoSrc() {
    // лениво подставляем src только при первом запуске
    if (!video.currentSrc && !video.src) {
        video.src = './assets/explosion_hd.mp4';
        video.preload = 'auto';
        video.load();
    }
}

async function runSimpleCountdownAndPlay() {
    if (isCounting) return;
    isCounting = true;
    btn.disabled = true;

    ensureVideoSrc();
    showCountdown(3);

    let n = 3;
    timerId = setInterval(async () => {
        n -= 1;
        if (n >= 1) {
            countdownTime.textContent = String(n);
        } else {
            clearInterval(timerId);
            hideCountdown();
            timerId = null;

            // стартуем эффект (видео + вспышка + тряска)
            await fx.play();

            isCounting = false;
            btn.disabled = false;
        }
    }, 1000);
}

btn.addEventListener('click', runSimpleCountdownAndPlay);
btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); runSimpleCountdownAndPlay(); }
});

reset.addEventListener('click', () => {
    if (timerId) { clearInterval(timerId); timerId = null; }
    isCounting = false;
    btn.disabled = false;
    hideCountdown();
    countdownTime.textContent = '3';
    fx.reset();
});

window.addEventListener('beforeunload', () => fx.destroy());
