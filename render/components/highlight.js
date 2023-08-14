const hl = require('highlight.js');

module.exports = (m, {content = '', language}) => {
    return m('table',
        m('tbody',
            hl
                .highlightAuto(((content || "") + "\n"), language)
                .value
                .split('\n')
                .map((line, index) => m('tr',{'id': `L${index + 1}`, 'class': 'code-row'}, [
                    m('td.line-number',
                        {'data-line-number': index + 1}),
                    m('td', m.trust(`<code class="loc">${line}</code>`)),
                ]))
        ),
    );
};
