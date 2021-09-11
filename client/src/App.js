import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { Provider } from './context/Context';
import WithConsumer from './context/WithConsumer';

import Chat from './Chat';


import io from 'socket.io-client';
const socket = io('http://localhost:4000');


const App = (props) => {

  const [username, setUserName] = React.useState('');
  const [room, setRoom] = React.useState('');

  const joinRoom = ()=>{
    if(username !== '' && room !== ''){
      socket.emit('join_room', room);
    }
  }


  return (
    <div>
      <h3>Join Chat</h3>
      <input type="text" placeholder="John" onChange={ e =>{setUserName(e.target.value)}} />
      <input type="text" placeholder="Room Id" onChange={ e =>{setRoom(e.target.value)}}/>
      <button onClick={joinRoom}>Join A Room</button>

      <Chat socket={socket} username={username} room={room} />
    </div>
  )
}

export default WithConsumer(App);
