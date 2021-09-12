import React from 'react';
import io from 'socket.io-client';


const socketContext = React.createContext();
export const Consumer = socketContext.Consumer;


export class Provider extends React.Component {


  constructor(props) {
    super(props);
    // const socket = new WebSocket('ws://localhost:4000');
    const socket = io('http://localhost:4000');;

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

  //   const connectWebSocket = () => {
  //   return socket = new WebSocket('ws:http://localhost:4000');
  // } 

  sendMessage = ()=>{
    const thisDate = new Date();
    const message = {
      officialUserName: this.state.officialUserName,
      // userName: this.state.userName,
      time: thisDate.getHours() + ':' + ( `${thisDate.getMinutes()}`.length === 1 ? '0' + thisDate.getMinutes() : thisDate.getMinutes() ),
      message: this.state.message,
    }

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

  componentDidMount() {}

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


