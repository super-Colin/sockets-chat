import React from 'react';



const socketContext = React.createContext();
export const Consumer = socketContext.Consumer;


export class Provider extends React.Component {


  constructor(props) {
    super(props);
    const socket = new WebSocket('ws://localhost:4000');

    this.state = {
      socket: socket,
      userName:'',
      officialUserName:'',
      // message:JSON.stringify({test:"hello"}),
      message: '',
      chatRecord: [],

      sendMessage: this.sendMessage.bind(this),
      changeName : this.changeName.bind(this),
    }

    socket.onopen = () => {
      console.log('Connected to server');
    }



    socket.onmessage = (message) => {
      // console.log('client recieved ~~~ ',message.data);
      // const dataObject = JSON.parse(message.data);
      // console.log(dataObject);
      // console.log('~~~~~~~~~~~~~~~~~~~~~~~');
      const dataObject = JSON.parse(message.data);
      console.log('data recieved', dataObject);
      switch (dataObject.action){
        case 'officializeChangeName':
          console.log('officializeChangeName', dataObject.officialUserName);
          this.state.officialUserName = dataObject.officialUserName;
      }

    }




  }

  // ~~~~~~~~~~~~~~~~~~~
  // ~~~ React State ~~~
  // ~~~~~~~~~~~~~~~~~~~

  componentDidMount() {}

  componentDidUpdate() {}

  componentWillUnmount() {}



  // ~~~~~~~~~~~
  // ~~ UTILS ~~
  // ~~~~~~~~~~~

  //   const connectWebSocket = () => {
  //   return socket = new WebSocket('ws:http://localhost:4000');
  // } 

  sendMessage = ()=>{
    const message = {
      action: 'sendMessage',
      officialUserName: this.state.officialUserName,
      userName: this.state.userName,
      message: this.state.message,
    }

    // this.state.socket.send( 'message',JSON.stringify(message) );
    this.state.socket.send( JSON.stringify(message) );
    // this.state.socket.send( message );
  }

  changeName = ()=>{
    const message = {
      action : 'changeUserName',
      userName : this.state.userName,
    }
    this.state.socket.send(JSON.stringify(message));
  }
  

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


