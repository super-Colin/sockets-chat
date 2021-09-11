
const Websocket = require('ws');

const serverConfig = {
  port: 4000,
  maxPayload: 1024,
}


const wss = new Websocket.Server(serverConfig);

let clients = {};
let chatRecord = [];


wss.on('connection' , socket => {
  const socketId = Math.ceil(Math.random() * 9999999);
  clients[socketId] = {socketId:socketId, socket:socket};
  console.log('User Connected: ');

  let chatRecordMessage = { action: 'chatRecord', chatRecord: chatRecord}
  socket.send(JSON.stringify( chatRecordMessage ));
  



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
        // socket.send( JSON.stringify(newChatEntry) );
        let chatRecordMessage = { action: 'chatRecord', chatRecord}
        socket.send(JSON.stringify( chatRecordMessage ));
        break;

      case 'changeUserName':
        console.log('changeUserName Switch');
        const nameResponse = {
          action: 'officializeChangeName',
          officialUserName: dataObject.userName,
        }
        socket.send(JSON.stringify(nameResponse));
        break;
      case 'chatRecord':
        
        break;
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

