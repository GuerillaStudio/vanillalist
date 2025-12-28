module.exports = () => {
    let baseUrl = 'http://localhost:1312/'
    if (process.env.CONTEXT === 'production') { baseUrl = process.env.URL }
    if (process.env.CONTEXT === 'deploy-preview') { baseUrl = process.env.DEPLOY_URL }
    return {
        name: 'Vanilla List',
        description: 'The Vanilla JavaScript Repository',
        descriptionLong: 'Find the best JavaScript plugins, components & libraries for your next project in this handpicked collection of lightweight tools and save time as a developer!',
        tagline: 'Because lighter plugins mean lighter sites',
        baseUrl: baseUrl
    }
};
