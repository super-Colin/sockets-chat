
const express = require('express');
const app = express();

const http = require('http');
const cors = require('cors');

const {Server} = require('socket.io');
// import {Server} from 'socket.io';

app.use(cors());


const server = http.createServer(app);

console.log(Server);
const io = new Server(server, {
  cors:{
    // origin: '*',
    origin: 'http://localhost:3000',
    method:['GET', 'POST'],
  }
});

// const server = http.createServer(app);
// const io = new Server(server, {
//   cors:{
//     // origin: '*',
//     origin: 'http://localhost:3000',
//     method:['GET', 'POST'],
//   }
// });



io.on('connection', (socket)=>{
  console.log('User Connected', socket.id);
  
  socket.on('join_room',(room)=>{
    socket.join(room);
    console.log(`User ${socket.id} joined room: ${room}`);
  });

  socket.on('send_message', (data)=>{
    console.log('recieved message', data, socket.rooms);
    io.to(data.room).emit('received_message', data);
    // socket.to(data.room).emit('receive_message', data);
  });

  socket.on('disconnect', (data)=>{
    console.log('User Disconnected', socket.id);
  });

});




server.listen(4000, () => {
  console.log('server running');
});


