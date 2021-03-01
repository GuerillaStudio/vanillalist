const card = require('./_includes/plugin')
const paginationGenerator = require('./_includes/pagination')
class Main {
    data() {
        return {
            layout: "layouts/base.njk",
            pagination: {
                data: "collections.plugins",
                size: "24",
                alias: "plugins"
            },
            permalink: data => `/${data.pagination.pageNumber > 0 ? 'page/' + (data.pagination.pageNumber + 1) + '/' : ''}/index.html`

        };
    }

    async render(data) {
        const list = (await Promise.all(data.plugins.map(async plugin => {
            return card({
                ...plugin,
                image92: await this.getUrl(this.png(this.resize('./uploads/' + plugin.image, { width: 92, height: 58 }))),
                image184: await this.getUrl(this.png(this.resize('./uploads/' + plugin.image, { width: 184, height: 116 }))),
                image308: await this.getUrl(this.png(this.resize('./uploads/' + plugin.image, { width: 308, height: 195 }))),
                image616: await this.getUrl(this.png(this.resize('./uploads/' + plugin.image, { width: 616, height: 390 })))
            })
        }))).join('');

        return `
        <div class="pluginList">
            ${list}
        </div>
        ${paginationGenerator(data.pagination, data.page)}
        `
    }
}

module.exports = Main;
