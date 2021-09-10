const { Stats } = require('fs');

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// https://dev.to/bravemaster619/how-to-use-socket-io-client-correctly-in-react-app-o65
// https://github.com/lethanhvietctt5/video-chat-app


io.on('connection', function(socket){
  console.log('a user connected: ', socket.id);

  socket.on('messageSubmitted', ({name, message}) =>{
    console.log(`${name}: ${message}`);
    io.emit('chatUpdated', {name, message});
  } )

});

io.on('disconnect', function(){
  console.log('user disconnected: ', socket.id);
});






http.listen(4000, ()=>{
  console.log('listening on port 4000');
})

