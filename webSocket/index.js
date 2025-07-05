import express from 'express'
import { Server } from 'socket.io';
const app=express();

// const server=app.listen(3000,()=>{
//     console.log("Listening at port 3000");
// })
// const io=new Server(server);

import http from 'http'
const server=http.createServer(app);
const io=new Server(server)

io.on("connection",(socket)=>{

    socket.on("message",(data)=>{
        io.emit('new-mesage',data)
    })

    socket.on("disconnect",()=>{
        console.log('dissconnected from server');
        
    })
})

server.listen(3000,()=>{
    console.log("Listening at port 3000");
})