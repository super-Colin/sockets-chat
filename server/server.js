
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





// Keep track of chat messages
let chatRecord = [{author:'test',message: 'test', time:'test', test: 'test'}];



//socket functionality
io.on('connection' , socket => {
  console.log('User Connected: ', socket.id);

  // Send the history of chat messages to the new user
  socket.emit('chat_record', chatRecord);


  socket.on('test', data => {console.log('Received test')})
  
  socket.on('send_message', (data)=>{
    console.log('send_message', data);
    const newRecord = {
      author: data.officialUserName,
      time: data.time,
      message: data.message,
    }
    chatRecord.push(newRecord);
    io.emit('chat_record', chatRecord);
  })

  
  socket.on('change_user_name', (data)=>{
    console.log('change_user_name', data);
    socket.officialUserName = data.userName
    console.log('officialUserName is now ', socket.officialUserName);
    socket.emit('officialize_change_name', {officialUserName: data.userName});
  })




  socket.on('close', ()=>{
    console.log('User Disconnected: ', socket.id);
  })

})





// Listen for connections
server.listen(4000, ()=>{
  console.log('Server is running on port 4000');
})