const mainContent = require('./mainContent');
const footer = require('./footer');

module.exports = (m, {location, content, language}) => {
    const isSnippet = location === 'snippet';

    const scripts = ['/js/main.js', '/custom/addon.js'];

    return m("body", [
        mainContent(m, {location, content, language}),
        footer(m, {isSnippet}),
        isSnippet && m("link", {
            rel: "stylesheet", href: "/vendor/highlight/styles/night-owl.css"
        }),
        ...scripts.map(x => m("script", {
            src: x, type: "application/javascript"
        })),
    ]);

};
