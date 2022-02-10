module.exports = function (plugin) {
    const sources = []
    if (plugin.url_demo) { sources.push({ label: 'demo', url: plugin.url_demo }) }
    if (plugin.url_github) { sources.push({ label: 'github', url: plugin.url_github }) }
    if (plugin.url_npm) { sources.push({ label: 'npm', url: plugin.url_npm }) }

    const links = sources.map(source => {
        return `<a class="plugin__link plugin__link--${source.label}" href="${source.url}?ref=vanillalist" target="_blank" rel="noopener">${source.label}</a>`
    }).join('')

    const visualLink = plugin.url_demo ? plugin.url_demo : plugin.url_github ? plugin.url_github : plugin.url_npm ? plugin.url_npm : ''

    return `
        <div class="plugin">
            <a class="plugin__visual" href="${visualLink}?ref=vanillalist" target="_blank" rel="noopener">
                <picture>
                    <source
                        type="image/webp"
                        media="(max-width: 559px)"
                        srcset="${plugin.imageWebp.image92} 1x,
                                ${plugin.imageWebp.image184} 2x">
                    <source
                        type="image/webp"
                        srcset="${plugin.imageWebp.image308} 1x,
                                ${plugin.imageWebp.image616} 2x">
                    <source
                        media="(max-width: 559px)"
                        srcset="${plugin.imagePng.image92} 1x,
                                ${plugin.imagePng.image184} 2x">
                    <img
                        src="${plugin.image308}" alt="${plugin.title}"
                        srcset="${plugin.image616} 2x"
                        width="308" height="195"
                        loading="lazy">
                </picture>
            </a>
            <h2 class="plugin__name">${plugin.title}</h2>
            <p class="plugin__about">${plugin.description}</p>
            <div class="plugin__links">${links}</div>
        </div>
    `
}
