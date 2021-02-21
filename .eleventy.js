const glob = require("glob-promise")
const fs = require("fs")
const { URL } = require("url")
const sharpPlugin = require("eleventy-plugin-sharp")

module.exports = function (eleventyConfig) {

    eleventyConfig.setBrowserSyncConfig({ port: 1312 })
    eleventyConfig.addPlugin(sharpPlugin(
        {
            urlPath: '/uploads',
            outputDir: 'public/uploads'
        }
    ))

    eleventyConfig.addCollection('plugins', async () => {
        const files = (await glob('plugins/*.json')).map(filename => {
            return fs.promises.readFile(filename, { encoding: 'utf-8' })
        })
        const plugins = await Promise.all(files)
        return plugins.map(JSON.parse).sort((a, b) => new Date(b.date) - new Date(a.date))
    });

    eleventyConfig.addFilter('JSONstringify', (value) => {
        return JSON.stringify(value)
    })
    eleventyConfig.addFilter("absoluteUrl", (url, base) => {
        try { return new URL(url, base).toString() } catch (e) {
            console.error(`Trying to convert ${url} to be an absolute url with base ${base} and failed, returning: ${url} (invalid url)`);
            return url;
        }
    });

    eleventyConfig.addShortcode("titleGenerator", (title, site, pageUrl, pagination) => {
        let endTitle = site.name
        let paginationSuffix = (pagination && pagination.pageNumber) ? ` (page ${pagination.pageNumber + 1})` : ''
        if (title) { endTitle = `${title} • ${site.name}` }
        if (pageUrl === '/') { endTitle = `${site.name} • ${site.description}` }
        return endTitle + paginationSuffix
    });


    // eleventyConfig.addPassthroughCopy("./node_modules/sifter/sifter.min.js")
    // eleventyConfig.addPassthroughCopy("./src/js/")
    eleventyConfig.addPassthroughCopy({ "./src/static/": "/"})

    eleventyConfig.addWatchTarget("./src/sass/")
    // eleventyConfig.addWatchTarget("./src/js/")
    eleventyConfig.addWatchTarget("./src/static/")

    return {
        dir: {
            input: "src",
            output: "public",
        },
    };
};
