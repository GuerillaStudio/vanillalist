const card = require('./_includes/plugin')

class Main {
    data() {
        return {
            layout: "layouts/search.njk",
            title: "Search",
            description: "Search among this high-quality directory (100+) of curated lightweight vanilla JavaScript plugins components & libraries",
            permalink: "/search/index.html",
            date: 'git Last Modified',
        };
    }

    render(data) {
        const cardTemplate = `
            <script>
                window.vanillalistCard = ${card.toString()}
            </script>
        `;

        return `
            <div class="txtcenter hidden" data-search="noresult">No plugin found with those keywords :(</div>
            <div class="pluginList" data-search="results">

            </div>
            ${cardTemplate}
        `
    }
}

module.exports = Main;
