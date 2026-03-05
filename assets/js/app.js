import { clearRenderRoots } from "./dom.js";
import { buildLeftBlocks, buildRightBlocks } from "./blocks.js";
import { paginateDesktop } from "./pagination.js";
import { renderMobileFlow } from "./mobile.js";

let cvData = null;
let isMobile = null;

function initTextVideoMode() {
    const toggleButton = document.getElementById("fx-toggle");
    const bgVideo = document.getElementById("bg-video");
    const labelOff = "Бахнуть";
    const labelOn = "Перестать";

    if (!toggleButton || !bgVideo) {
        return;
    }

    const setMode = async (enabled) => {
        document.body.classList.toggle("text-video-mode", enabled);
        toggleButton.textContent = enabled ? labelOn : labelOff;

        if (enabled) {
            try {
                await bgVideo.play();
            } catch (error) {
                console.warn("Не удалось запустить фон-видео", error);
            }
            return;
        }

        bgVideo.pause();
    };

    toggleButton.addEventListener("click", async () => {
        const enabled = !document.body.classList.contains("text-video-mode");
        await setMode(enabled);
    });

    toggleButton.textContent = labelOff;
}

function renderCurrentMode() {
    if (!cvData) {
        return;
    }

    const leftBlocks = buildLeftBlocks(cvData);
    const rightBlocks = buildRightBlocks(cvData);

    if (isMobile) {
        renderMobileFlow(leftBlocks, rightBlocks);
        return;
    }

    paginateDesktop(leftBlocks, rightBlocks);
}

function beforePrint() {
    if (!isMobile) {
        return;
    }

    clearRenderRoots();
    const leftBlocks = buildLeftBlocks(cvData);
    const rightBlocks = buildRightBlocks(cvData);
    paginateDesktop(leftBlocks, rightBlocks);
}

function afterPrint() {
    if (!isMobile) {
        return;
    }

    clearRenderRoots();
    const leftBlocks = buildLeftBlocks(cvData);
    const rightBlocks = buildRightBlocks(cvData);
    renderMobileFlow(leftBlocks, rightBlocks);
}

async function loadCV() {
    try {
        const response = await fetch("data.json", { cache: "no-store" });
        cvData = await response.json();

        const media = window.matchMedia("(max-width: 960px)");
        isMobile = media.matches;
        renderCurrentMode();

        media.addEventListener("change", (event) => {
            isMobile = event.matches;
            clearRenderRoots();
            renderCurrentMode();
        });

        window.addEventListener("beforeprint", beforePrint);
        window.addEventListener("afterprint", afterPrint);

        const printMedia = window.matchMedia("print");
        const onPrintMediaChange = (event) => {
            if (event.matches) {
                beforePrint();
                return;
            }
            afterPrint();
        };

        if (printMedia && typeof printMedia.addEventListener === "function") {
            printMedia.addEventListener("change", onPrintMediaChange);
        } else if (printMedia) {
            printMedia.onchange = onPrintMediaChange;
        }
    } catch (error) {
        console.error("Не удалось загрузить data.json", error);
    }
}

document.addEventListener("DOMContentLoaded", loadCV);
document.addEventListener("DOMContentLoaded", initTextVideoMode);
