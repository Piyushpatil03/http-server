const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {

    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query; 

    if (req.method === 'GET' && pathname === "/data"){

        if (query.n) {
            const filename = `tmp/data/${query.n}.txt`;
            console.log(filename)

            if (query.m){
                fs.readFile(filename, 'utf8', (err, data) => {
                    if (err) {
                        res.writeHead(404, { 'Content-Type': 'text/plain' });
                        console.log(err)
                        res.end('File not found');
                    } else {
                        const lines = data.split('\n');
                        const lineNumber = parseInt(query.m) - 1;
                        const line = lines[lineNumber] || 'NOT FOUND';
                        res.writeHead(200, { 'Content-Type': 'text/plain' });
                        res.end(line);
                    }
                });
            } 
            else {
                fs.readFile(filename, 'utf8', (err, data) => {
                    if (err) {
                        res.writeHead(404, { 'Content-Type': 'text/plain' });
                        res.end('File not found');
                    } else {
                        res.writeHead(200, { 'Content-Type': 'text/plain' });
                        res.end(data);
                    }
                });
            }
        }
        else {
            // if n is not provided
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Query parameter n is required');
        }
    }
});


const port = 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
