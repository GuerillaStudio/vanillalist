const card = require('./_includes/plugin')

class Main {
    data() {
        return {
            layout: "layouts/search.njk",
            title: "Search",
            description: "Search JavaScript Vanilla Plugins",
            permalink: "/search/index.html",
        };
    }

    render(data) {
        const cardTemplate = `
            <script>
                window.vanillalistCard = ${card.toString()}
            </script>
        `;

        return `
            <div class="pluginList" data-search="results">

            </div>
            ${cardTemplate}
        `
    }
}

module.exports = Main;
