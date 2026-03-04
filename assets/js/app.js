import { clearRenderRoots } from "./dom.js";
import { buildLeftBlocks, buildRightBlocks } from "./blocks.js";
import { paginateDesktop } from "./pagination.js";
import { renderMobileFlow } from "./mobile.js";

let cvData = null;
let isMobile = null;

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
        if (printMedia && printMedia.addEventListener) {
            printMedia.addEventListener("change", (event) => {
                if (event.matches) {
                    beforePrint();
                    return;
                }
                afterPrint();
            });
            return;
        }

        if (printMedia && printMedia.addListener) {
            printMedia.addListener((event) => {
                if (event.matches) {
                    beforePrint();
                    return;
                }
                afterPrint();
            });
        }
    } catch (error) {
        console.error("Не удалось загрузить data.json", error);
    }
}

document.addEventListener("DOMContentLoaded", loadCV);
