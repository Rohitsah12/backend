import express from 'express'
import { Server } from 'socket.io';
const app = express();
import path from 'path';
import http from 'http'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Fix for __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// const server=app.listen(3000,()=>{
//     console.log("Listening at port 3000");
// })
// const io=new Server(server);

const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

io.on("connection", (socket) => {

    // socket.on("message", (data) => {
    //     socket.broadcast.emit('new-message', data);
    // });

    socket.on("message", ({room,msg}) => {
        socket.to(room).emit('new-message',msg);
    });

    socket.on('join-room',(room)=>{
        socket.join(room);
    })

    socket.on("disconnect", () => {
        console.log('dissconnected from server');
    });
});

server.listen(3000, () => {
    console.log("Listening at port 3000");
});
