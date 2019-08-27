const express = require('express');
const helmet = require('helmet');

const rawBody = require('./middleware/rawBody');
const mongoose = require('./middleware/mongoose');
const render = require('./middleware/render');

const app = express();

const home = require('./routes/home');
const getSnippet = require('./routes/getSnippet');
const getSnippetRaw = require('./routes/getSnippetRaw');
const createSnippet = require('./routes/createSnippet');
const fork = require('./routes/fork');

app.use(helmet());
app.use(express.static(__dirname + '/public'));
app.use('/custom', express.static(__dirname + '/custom'));
app.use(express.urlencoded({extended: true})); // parse formdata
app.use(express.json()); // parse JSON requests
app.use(rawBody());

app.use(mongoose());
app.use(render());

app.post('/fork', fork);
app.post('/', createSnippet);

app.get('/:hash', getSnippet);
app.get('/:hash/raw', getSnippetRaw);
app.get('/', home);


const PORT = process.env.BIN_PORT || 1998;
app.listen(PORT, () => console.log('Listening on port', PORT));
