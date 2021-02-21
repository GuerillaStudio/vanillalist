class PluginSearch {
    constructor() {
        this.plugins = null
        this.container = document.querySelector('[data-search="results"]')
        this.form = document.querySelector('[data-search="form"]')
        this.input = document.querySelector('[data-search="input"]')
        this.cardGenerator = window.vanillalistCard
        this.searchEntry = new URLSearchParams(document.location.search.substring(1)).get('s')
        this.sifterOptions = {
            fields: ['title', 'description'],
            filter: true
        }

        this.init()
    }

    async init() {
        const plugins = await this.getPlugins()
        this.generateResults(this.filterResults(plugins))
        this.input.value = this.searchEntry ? this.searchEntry : ''
        this.form.addEventListener('submit', e => {
            this.updateResults(plugins)
            e.preventDefault()
        })
    }

    getPlugins() {
        return fetch('/api/plugins.json')
            .then(response => {
                return response.json()
            })
    }

    filterResults(plugins) {
        const instance = new Sifter(plugins)
        const results = []
        if (this.searchEntry) {
            instance.search(this.searchEntry, this.sifterOptions).items.sort((a, b) => a.score - b.score).map(i => results.push(plugins[i.id]))
        }
        return results
    }

    generateResults(plugins) {
        this.container.innerHTML = plugins.map(plugin => {
            return this.cardGenerator(plugin)
        }).join('');
    }

    updateResults(plugins) {
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set('s', this.input.value);
        history.replaceState(null, null, "?" + queryParams.toString());
        this.searchEntry = new URLSearchParams(document.location.search.substring(1)).get('s')
        this.generateResults(this.filterResults(plugins))
    }

}

new PluginSearch()
