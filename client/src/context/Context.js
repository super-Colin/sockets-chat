import React from 'react';
import io from 'socket.io-client';


const socketContext = React.createContext();
export const Consumer = socketContext.Consumer;


export class Provider extends React.Component {


  constructor(props) {


    super(props);
    // let socketURL = 'http://localhost:8080';
    // console.log('requesting: ', `${socketURL}`);
    console.log('requesting: ', `${window.location}`);
    // const socket = io(`${socketURL}`);
    const socket = io(`${window.location}`);
    // const socket = this.connectSocket();

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

  // createSocketUrl = async ()=>{
  //   // get the current port we're running on from the heroku server
  //   let req = new XMLHttpRequest();
  //   let URL = `${document.location}`;
  //   // strip the protocol and port from the URL
  //   let cleanedURL = URL.replace (/^[a-z]{4,5}\:\/{2}[a-z]{1,}\:[0-9]{1,4}.(.*)/, '$1'); 
  //   req.open('GET', cleanedURL, false);
  //   req.send(null);
  //   var headers =  req.getAllResponseHeaders().toLowerCase();
  //   const SOCKET_PORT = await headers.indexOf('x-powered-by') > -1 ? req.getResponseHeader('x-current-socket') : '80';
  //   return `${cleanedURL}:${SOCKET_PORT}`
  // }

  // connectSocket = async ()=>{
  //   let socketURL = await this.createSocketUrl();
  //   console.log('requesting: ', `${socketURL}`);
  //   const socket = io(`${socketURL}`);
  //   return socket;
  // }


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


