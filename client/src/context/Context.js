import React from 'react';
import io from 'socket.io-client';


const socketContext = React.createContext();
export const Consumer = socketContext.Consumer;


export class Provider extends React.Component {


  constructor(props) {
    let req = new XMLHttpRequest();
    req.open('GET', document.location, false);
    req.send(null);
    var headers = req.getAllResponseHeaders().toLowerCase();
    // const SOCKET_PORT = headers.indexOf('x-powered-by') > -1 ? req.getResponseHeader('x-powered-by') : '801';
    const SOCKET_PORT = headers.indexOf('x-powered-by') > -1 ? req.getResponseHeader('x-current-socket') : '80';
    super(props);
    // const socket = new WebSocket('ws://localhost:4000');
    console.log('requesting: ', `${document.location}:${SOCKET_PORT}`)
    const socket = io(`${document.location}:${SOCKET_PORT}`);;

    this.state = {
      socket: socket,
      userName:'',
      officialUserName:'',
      officialRoomName:'general',
      message: '',
      chatRecord: [],


      sendMessage: this.sendMessage.bind(this),
      changeName : this.changeName.bind(this),
    }

    socket.on('connect', () => {
      console.log('Connected to server');
    })


  }



  // ~~~~~~~~~~~
  // ~~ UTILS ~~
  // ~~~~~~~~~~~

  sendMessage = ()=>{
    const thisDate = new Date();
    const message = {
      officialUserName: this.state.officialUserName,
      time: thisDate.getHours() + ':' + ( `${thisDate.getMinutes()}`.length === 1 ? '0' + thisDate.getMinutes() : thisDate.getMinutes() ),
      message: this.state.message,
    }

    // send the message to the server
    this.state.socket.emit( 'send_message', message );
  }

  changeName = (newName) => {
    console.log('client side change name request');
    this.state.userName = newName;
    this.state.socket.emit('change_user_name', { userName:newName});
  }
  
  // ~~~~~~~~~~~~~~~~~~~
  // ~~~ React State ~~~
  // ~~~~~~~~~~~~~~~~~~~

  componentDidMount() {
    // update the title of the page on load
    document.title = 'SC LIVE Chat'
  }

  componentDidUpdate() {}

  componentWillUnmount() {}

  // ~~~~~~~~~~~~
  // ~~ RENDER ~~
  // ~~~~~~~~~~~~
  render() {
    return (
      <socketContext.Provider value={this.state}>
        {this.props.children}
      </socketContext.Provider>
    );
  }

}


