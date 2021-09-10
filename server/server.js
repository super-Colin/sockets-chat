
const Websocket = require('ws');

const serverConfig = {
  port: 4000,
  maxPayload: 1024,
}


const wss = new Websocket.Server(serverConfig);

let clients = {};


wss.on('connection' , socket => {
  const socketId = Math.ceil(Math.random() * 9999999);

  
  // add connection to clients 
  // clients.push({ socketId:socketId, socket:socket});
  clients[socketId] = {socketId:socketId, socket:socket};
  chatRecord = [];
  console.log('User Connected: ');



  socket.on('message', message =>{
    const dataObject = JSON.parse(message);
    console.log('Message Received: ', dataObject, typeof(dataObject));
    switch(dataObject.action){
      case 'sendMessage':
        console.log('sendMessage Switch');
        const newChatEntry = {
          from: dataObject.userName,
          fromId: socketId,
          toChannel: dataObject.toChannel,
          message: dataObject.message,
        }
        chatRecord.push(newChatEntry);
        socket.send( JSON.stringify(newChatEntry) );

      case 'changeUserName':
        const nameResponse = {
          action: 'officializeChangeName',
          officialUserName: dataObject.userName,
        }
        socket.send(JSON.stringify(nameResponse));
    }
    // socket.send('message recieved');

  })


  // socket.on('close', ()=>{
  //   console.log('User Disconnected: ', socket.id);
  // })
  socket.on('close',()=>{
    console.log('User Disconnected: ');
    delete clients[socketId];
  })

})

