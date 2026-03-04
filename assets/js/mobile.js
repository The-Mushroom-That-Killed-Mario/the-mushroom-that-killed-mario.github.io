export function renderMobileFlow(leftBlocks, rightBlocks) {
    const mobileRoot = document.getElementById("mobile");
    mobileRoot.innerHTML = "";

    [...leftBlocks, ...rightBlocks].forEach((block) => {
        mobileRoot.appendChild(block);
    });
}
