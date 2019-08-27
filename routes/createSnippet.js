module.exports = (req, res) => {

    const content = req.rawText || req.body.snippet;
    if (!content) return res.redirect('/');
    req.models.snippets.create({content})
        .then(doc => {
            res.redirect(`/${doc.hash}`);
        });

};
