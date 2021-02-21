module.exports = function (plugin) {
    const sources = []
    if (plugin.url_demo) { sources.push({ label: 'demo', url: plugin.url_demo }) }
    if (plugin.url_github) { sources.push({ label: 'github', url: plugin.url_github }) }
    if (plugin.url_npm) { sources.push({ label: 'npm', url: plugin.url_npm }) }

    const links = sources.map(source => {
        return `<a class="plugin__link plugin__link--${source.label}" href="${source.url}?ref=vanillalist" target="_blank">${source.label}</a>`
    }).join('')

    const visualLink = plugin.url_demo ? plugin.url_demo : plugin.url_github ? plugin.url_github : plugin.url_npm ? plugin.url_npm : ''

    return `
        <div class="plugin">
            <a class="plugin__visual" href="${visualLink}?ref=vanillalist">
                <img srcset="${plugin.image} 1x, ${plugin.image2x} 2x" alt="${plugin.title}" width="308" height="195">
            </a>
            <h2 class="plugin__name">${plugin.title}</h2>
            <p class="plugin__about">${plugin.description}</p>
            <div class="plugin__links">${links}</div>
        </div>
    `
}
