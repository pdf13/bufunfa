var bodyParser = require('body-parser');
const express = require('express');

const sentry = require('./sentry');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());

app.get('/sentry', sentry);
app.post('/sentry', sentry);

app.listen(port, () => {
    console.log(`Bunfunfa listening on port ${port}`);
})
