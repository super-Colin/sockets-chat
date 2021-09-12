
const express = require('express');
const app = express();

const http = require('http');
const cors = require('cors');

const {Server} = require('socket.io');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors:{
      origins: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    }
});

function createRandomHexCode(){
  return Math.floor(Math.random()*16777216).toString(16);
}




// Keep track of chat messages
let chatRecord = [{author:'test',message: 'test', time:'test', authorColor: 'ffff00', test: 'test'}];



//socket functionality
io.on('connection' , socket => {
  socket.officialUserColor = createRandomHexCode();
  console.log('User Connected: ', socket.id);

  // Send the history of chat messages to the new user
  socket.emit('chat_record', chatRecord);


  socket.on('test', data => {console.log('Received test')})
  
  socket.on('send_message', (data)=>{
    console.log('send_message', data);
    const newRecord = {
      // author: data.officialUserName,
      room: toString(socket.room || 'general'),
      author: toString(socket.officialUserName),
      authorColor: toString(socket.officialUserColor),
      time: toString(data.time),
      message: toString(data.message),
    }
    chatRecord.push(newRecord);
    io.emit('chat_record', chatRecord);
  })

  
  socket.on('change_user_name', (data)=>{
    // console.log('change_user_name', data);
    socket.officialUserName = data.userName
    console.log('officialUserName is now ', socket.officialUserName);
    socket.emit('change_user_name_success', {officialUserName: data.userName});
  })

  socket.on('join_room',(data)=>{
    console.log('join_room', data);
    const room = toString(data.room);
    socket.room = room;
    socket.join( room || 'general' );
    socket.emit('join_room_success', {room: room});
  } )




  socket.on('close', ()=>{
    console.log('User Disconnected: ', socket.id);
  })

})




// Utils



// Listen for connections
server.listen(4000, ()=>{
  console.log('Server is running on port 4000');
})