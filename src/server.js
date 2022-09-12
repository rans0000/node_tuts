// import http from 'node:http';
// import fs from 'node:fs';
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log(req.url);
    let path = 'src/view/';

    switch (req.url) {
        case '/':
            path += 'index.html';
            break;
        case '/about':
            path += 'about.html';
            break;
        default: path += '404.html';
            break;
    }

    fs.readFile(path, (err, data) => {
        console.log(err);
        if (err) {
            res.end("");
        }
        else {
            // res.setHeader();
            res.end(data);
        }
    });

});

server.listen(3000, 'localhost', () => {
    console.log('started listening at 3000!');
});