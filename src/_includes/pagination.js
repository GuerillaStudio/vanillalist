module.exports = function (pagination, page) {
    const nextBtn = pagination.href.next ? `<a class="btn btn--primary btn--big w100" href="${pagination.href.next}" aria-label="Next page">Moar plugin</a>` : ''
    const list = pagination.pages.map((item, i) => {
        const current = page.url == pagination.hrefs[i]
        const currentTxt = (txtCurrent, txtFallback) => {
            return current ? txtCurrent : (txtFallback ? txtFallback : '')
        }
        return `<li class="${current ? 'current' : ''}">
            <a class="pagination__link btn btn--${currentTxt('secondary', 'tertiary')}" href="${pagination.hrefs[i]}" aria-label="${currentTxt('Current Page, ')}Page ${i + 1}" ${currentTxt('aria-current="true"')}>${i + 1}</a>
        </li>`
    }).join('');

    return `
    <nav class="pagination" aria-label="Pagination Navigation">
        ${nextBtn}
        <ul>
            ${list}
        </ul>
    </nav>
    `
}
