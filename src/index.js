const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.get('/sentry', (req, res) => {
    res.send("Hello World");
});


app.listen(port, () => {
    console.log(`Bunfunfa listening on port ${port}`);
})
