
const MAX_CHAT_MESSAGES = 12;
const PORT = process.env.PORT || 8080;


const { time } = require('console');
const express = require('express');
const http = require('http');
const socketApp = express(); //initialize express

const {Server} = require('socket.io'); // grab customized Server constructor from socket.io
const socketServer = http.createServer(socketApp);
const io = new Server(socketServer);






// // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// // HTTP Server
// // to serve React App
// // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
socketApp.use(express.static(__dirname + '/client/build/'));
// socketApp.use(express.static(__dirname + '/public'));

// socketServer.on( 'request', (req, res)=>{
//   // console.log('socket server request')
//   if(req.method === 'GET'){
//     // console.log('GET request');
//     if( ! res.headersSent){
//       // res.setHeader('x-current-port', PORT);
//       // res.setHeader('Strict-Transport-Security',  'max-age=0');
//     }
//   }
// })



// // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// // Chat App / Sockets
// // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Keep track of chat messages
const serverStart = new Date();
let chatRecord = [{author:'Server',message: 'Web socket server says hello :)', time: `${serverStart.getHours()}:${serverStart.getMinutes()}`, authorColor: 'ffff00', test: 'test'}];
// function for random color for new users
function createRandomHexCode(){return Math.floor(Math.random()*16777216).toString(16);}

//socket functionality
io.on('connection' , socket => {
  console.log('User Connected: ', socket.id);

  // create a consistant color for the user in chat
  socket.officialUserColor = createRandomHexCode();
  // Send the history of chat messages to the new user
  socket.emit('chat_record', chatRecord);


  socket.on('test', data => {console.log('Received test')})
  
  // On receiving a message from a user
  socket.on('client_message', (data)=>{
    console.log('client_message', data);

    // Check for all our expected values and ignore anything else
    let validMessage = true;
    let errorMessage = '';
    const setError = (newErrorMessage) => {
      validMessage = false;
      errorMessage = newErrorMessage;
    }
      
    const newRecord = {
      // room: (socket.room ? `${socket.room}` : validMessage = false),
      author: (socket.officialUserName ? `${socket.officialUserName}` : setError('No officialized name') ),
      authorColor: (socket.officialUserColor ? `${socket.officialUserColor}` : setError('You dont have a color set??? Try reconnecting..') ),
      time: ( data.time ? `${data.time}` : setError('Invalid time') ),
      message: (data.message ? `${data.message}` : setError('Invalid Message') ),
      key: `${new Date().getTime()}` // create a key for more effcient React rendering
    }

    // If it's valid, add it to the chat record
    if(validMessage){
      chatRecord.push(newRecord);
      // If chat is somehow over 100 remove *all but the last 100*
      if(chatRecord.length >= MAX_CHAT_MESSAGES){
        chatRecord = chatRecord.splice( chatRecord.length - MAX_CHAT_MESSAGES , chatRecord.length);
      }
      console.log('sending chat record')
      io.emit('chat_record', chatRecord);

      // else send a message letting them now something went wrong
    }else{
      console.log('invalid message')
      socket.emit('unsuccessful_message', {errorMessage: errorMessage} );
    }
  })

  
  socket.on('change_user_name', (data)=>{
    // Set a property on the socket to hold the official name
    socket.officialUserName = `${data.userName}`;
    console.log('officialUserName is now ', socket.officialUserName);
    socket.emit('change_user_name_success', {officialUserName: socket.officialUserName, officialUserColor: socket.officialUserColor});
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


// // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// // Listen for connections
// // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
socketServer.listen(PORT, ()=>{
  console.log(`Socket Server is running on port ${PORT}`);
})
