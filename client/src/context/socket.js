import React from 'react';
import socketio from 'socket.io-client';


const SOCKET_URL = 'ws:http://localhost:4000';


// const ws = new WebSocket(SOCKET_URL);
  
// export const socket = socketio.connect(SOCKET_URL);
export const ws = new WebSocket(SOCKET_URL);
export const SocketContext = React.createContext();
