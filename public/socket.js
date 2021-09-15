const socket = io(`${window.location}`);


function sendMessage() {
  console.log('sending socket message');
  socket.emit('client_message', document.getElementById('input').value); // A string
}
function sendTest() {
  socket.emit('test', 'test'); 
}
function updateOutput(message) {
  console.log('updating output');
  if(typeof(message) == 'object'){
    document.getElementById('output').innerHTML = JSON.stringify(message);
  }else{
    document.getElementById('output').innerHTML = message;
  }
}

socket.on('connect', () => {
  console.log('Connected to socket server and upgraded connection');
})

socket.on('chat_record', (data)=>{
  console.log('got message from socket server, ' + typeof(data));
  updateOutput(data);
})

socket.on('disconnect', () => {
  console.log('Disconnected from socket server');
  updateOutput("If you're seeing this the server probably went to sleep...zzzz...");
})
