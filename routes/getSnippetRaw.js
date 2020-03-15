const render = require('../render');

module.exports = (req, res) => {
    const {models, mongoose} = req;
    const id = req.params.id;
    const contentType = req.query.ctype || "text/plain";
    return models.snippets.findOne({_id: mongoose.Types.ObjectId(id)})
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
