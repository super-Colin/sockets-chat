
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
  console.log('User Connected: ', socket.id);

  // create a consistant color for the user in chat
  socket.officialUserColor = createRandomHexCode();
  // Send the history of chat messages to the new user
  socket.emit('chat_record', chatRecord);


  socket.on('test', data => {console.log('Received test')})
  
  // On receiving a message from a user
  socket.on('send_message', (data)=>{
    console.log('send_message', data);

    // Check for all our expected values and ignore anything else
    let validMessage = true;
    const newRecord = {
      // room: (socket.room ? `${socket.room}` : validMessage = false),
      author: (socket.officialUserName ? `${socket.officialUserName}` : validMessage = false),
      // author: (socket.officialUserName ? `${socket.officialUserName}` : console.log('invalid name')),
      authorColor: (socket.officialUserColor ? `${socket.officialUserColor}` : validMessage = false),
      // authorColor: (socket.officialUserColor ? `${socket.officialUserColor}` : console.log('invalid author color')),
      time: ( data.time ? `${data.time}` : validMessage = false),
      // time: ( data.time ? `${data.time}` : console.log('invalid time')),
      message: (data.message ? `${data.message}` : validMessage = false),
      // message: (data.message ? `${data.message}` : console.log('invalid message')),
    }

    // If it's valid, add it to the chat record
    if(validMessage){
      chatRecord.push(newRecord);
      // If chat is somehow over 100 remove *all but the last 100*
      if(chatRecord.length >= 100){
        const chatLength = chatRecord.length;
        chatRecord.splice( chatLength - 100 , chatLength);
      }
      console.log('sending chat record')
      io.emit('chat_record', chatRecord);
    }else{
      console.log('invalid message')
      socket.emit('unsuccessful_message', {errorMessage:'Invalid message'} );
    }
  })

  
  socket.on('change_user_name', (data)=>{
    // console.log('change_user_name', data);
    socket.officialUserName = data.userName
    console.log('officialUserName is now ', socket.officialUserName);
    socket.emit('change_user_name_success', {officialUserName: data.userName});
  })

  socket.on('join_room',(data)=>{
    console.log('join_room', data);
    const room = `${data.room}`;
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