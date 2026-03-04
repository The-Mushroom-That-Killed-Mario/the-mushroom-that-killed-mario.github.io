export function createElement(tag, attrs = {}, children = []) {
    const node = document.createElement(tag);

    Object.entries(attrs).forEach(([key, value]) => {
        if (key === "text") {
            node.textContent = value;
            return;
        }
        if (key === "html") {
            node.innerHTML = value;
            return;
        }
        if (key === "class") {
            node.className = value;
            return;
        }
        node.setAttribute(key, value);
    });

    children.forEach((child) => node.appendChild(child));
    return node;
}

export function clearRenderRoots() {
    const pages = document.getElementById("pages");
    const mobile = document.getElementById("mobile");
    pages.innerHTML = "";
    mobile.innerHTML = "";
}
