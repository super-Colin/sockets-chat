
const Websocket = require('ws');

const serverConfig = {
  port: 4000,
  maxPayload: 1024,
}


const wss = new Websocket.Server(serverConfig);


wss.on('connection', socket =>{
  console.log('User Connected: ');
  // console.log('User Connected: ', socket?.id);

  socket.on('message', message =>{
    console.log('Message Received: ', JSON.parse(message) );
  });

  socket.on('close', ()=>{
    console.log('User Disconnected: ', socket.id);
  })
})

