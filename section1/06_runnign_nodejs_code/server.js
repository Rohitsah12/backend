const { log } = require('console');
const http=require('http');

const server=http.createServer((req,res)=>{
    console.log(req);
    
    res.end('Hello from Node.js Server');
})

server.listen(3000);