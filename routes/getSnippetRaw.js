const render = require('../render');

module.exports = (req, res) => {
    const {models} = req;
    const hash = req.params.hash;
    const contentType = req.query.ctype || "text/plain";
    return models.snippets.findOne({hash})
        .then(doc => {
            if (!doc) {
                res.status(404);
                return res.send(
                    '<code>Nothing here, go <a href="/">back!</a></code>'
                );
            }
            res.writeHead(200, {"Content-Type": contentType + "; charset=utf-8"});
            res.end(doc.content);
        });
};
