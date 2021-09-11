import React, { useEffect, useState } from 'react';

const Chat = ({socket, username, room}) => {
  const [currentMessage, setCurrentMessage] = useState('')
  const [messages, setMessages] = useState([])



  const sendMessage = async ()=>{
    const time = new Date();
    if (currentMessage.trim() !== ''){
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: time.getHours() + ':' + time.getMinutes()
      }
      // console.log('sending message')
      await socket.emit('send_message', messageData);
    }else{
      console.log('message is empty');
    }
  }



  useEffect(() => {
    socket.on("received_message", (data) => {
      console.log('received message', data);
      setMessages((list) => [...list, data]);
    });
  }, [socket]);

  // useEffect(()=>{
  //   socket.on('received_message', (message)=>{
  //     console.log('received message', message);
  //     setMessages(messages => [...messages, message])
  //   })
  // }, [socket])

  return (
    <div>
      <div className="chat-header">
        <p>Live Chat</p>
      </div>

      <div className="chat-body">
        {messages.map((message, index)=>{
          return (
            <div key={index} className="message">
              <p>{message.author}</p>
              <p>{message.time}</p>
              <p>{message.message}</p>
            </div>
          )
        })}
      </div>
      
      <div className="chat-footer">
        <input type="text" placeholder="Type a message..."  onChange={ e =>{setCurrentMessage(e.target.value)}} />
        <button onClick={sendMessage} className="bg-primary px-4 py-1" >&#9658;</button>
      </div>
    </div>
  )
}

export default Chat
