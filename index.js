const express = require('express');
const app = express();
const port = 3000;

app.get('/', function (req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ Message: 'Hello World from Node.js', Version: 'v1' })
});

const server = app.listen(port, function () {
    const host = server.address().address;
    const port = server.address().port;        
    console.log('Server running at http://%s:%s', host, port);
});