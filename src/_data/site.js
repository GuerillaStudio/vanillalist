module.exports = () => {
    let baseUrl = 'http://localhost:1312/'
    if (process.env.CONTEXT === 'production') { baseUrl = process.env.URL }
    if (process.env.CONTEXT === 'deploy-preview') { baseUrl = process.env.DEPLOY_URL }
    return {
        name: 'Vanilla List',
        description: 'The Vanilla JavaScript Repository',
        baseUrl: baseUrl
    }
};
