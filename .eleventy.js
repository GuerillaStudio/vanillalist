const glob = require("glob-promise")
const fs = require("fs/promises")
const { URL } = require("url")
const { DateTime } = require("luxon")
const sharpPlugin = require("eleventy-plugin-sharp")
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {

    eleventyConfig.addGlobalData('generated', () => {
        let now = new Date();
        return new Intl.DateTimeFormat(
          'en-US', { dateStyle: 'full', timeStyle: 'long' }
        ).format(now);
      });


    eleventyConfig.setServerOptions({ port: 1312 })
    eleventyConfig.addPlugin(sharpPlugin(
        {
            urlPath: '/uploads',
            outputDir: 'public/uploads'
        }
    ))

    eleventyConfig.addCollection('plugins', async () => {
        const files = (await glob('plugins/*.json')).map(filename => {
            return fs.readFile(filename, { encoding: 'utf-8' })
        })
        const plugins = await Promise.all(files)
        return plugins.map(JSON.parse).sort((a, b) => b.id - a.id)
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
    eleventyConfig.addFilter("base64", async (url) => {
        return fs.readFile(url, 'base64')
    });

    eleventyConfig.addFilter("htmlDateString", (dateObj) => {
        // dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
        return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat('yyyy-LL-dd');
	});

    eleventyConfig.addShortcode("titleGenerator", (title, site, pageUrl, pagination) => {
        let endTitle = `${site.name} • ${site.description}`
        let paginationSuffix = (pagination && pagination.pageNumber) ? ` (page ${pagination.pageNumber + 1})` : ''
        if (title) { endTitle = `${title} • ${site.name}` }
        if (pageUrl === '/') { endTitle = `${site.name} • ${site.description}` }
        return endTitle + paginationSuffix
    });


    eleventyConfig.addPassthroughCopy({ "./src/static/": "/"})

    eleventyConfig.addWatchTarget("./src/sass/")
    eleventyConfig.addWatchTarget("./src/static/")

    // RSS
    eleventyConfig.addPlugin(pluginRss);

    return {
        dir: {
            input: "src",
            output: "public",
        },
    };
};
