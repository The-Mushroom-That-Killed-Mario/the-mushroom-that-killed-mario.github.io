function newPage() {
    const template = document.getElementById("page-template");
    return template.content.firstElementChild.cloneNode(true);
}

function pageFits(page) {
    return page.scrollHeight <= page.clientHeight + 0.5;
}

function appendWithPagination(pagesRoot, page, column, block) {
    column.appendChild(block);

    if (pageFits(page)) {
        return page;
    }

    column.removeChild(block);
    const nextPage = newPage();
    pagesRoot.appendChild(nextPage);

    const leftColumn = nextPage.querySelector(".colum-left");
    const rightColumn = nextPage.querySelector(".colum-right");
    const targetColumn = column.classList.contains("colum-left") ? leftColumn : rightColumn;
    targetColumn.appendChild(block);

    return nextPage;
}

export function paginateDesktop(leftBlocks, rightBlocks) {
    const pagesRoot = document.getElementById("pages");
    pagesRoot.innerHTML = "";

    let page = newPage();
    pagesRoot.appendChild(page);

    let leftColumn = page.querySelector(".colum-left");
    let rightColumn = page.querySelector(".colum-right");

    leftBlocks.forEach((block) => {
        const previousPage = page;
        page = appendWithPagination(pagesRoot, page, leftColumn, block);
        if (page !== previousPage) {
            leftColumn = page.querySelector(".colum-left");
            rightColumn = page.querySelector(".colum-right");
        }
    });

    rightBlocks.forEach((block) => {
        const previousPage = page;
        page = appendWithPagination(pagesRoot, page, rightColumn, block);
        if (page !== previousPage) {
            leftColumn = page.querySelector(".colum-left");
            rightColumn = page.querySelector(".colum-right");
        }
    });
}
