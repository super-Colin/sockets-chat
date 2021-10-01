import React, { useEffect } from 'react';
import WithConsumer from '../context/WithConsumer';

const ChatLog = ({context}) => {

  const [messages, setMessages] = React.useState([]);

    context.socket.on('chat_record', (data)=>{
      // console.log('chat_record', data);
      // console.log('chat_record');
      context.chatRecord = data;
      setMessages(data);
      document.getElementById('chatLog').scrollTop = document.getElementById('chatLog').scrollHeight;
    })

  // useEffect(() => {
  //   console.log('chat updated');
  // }, [context])

  return (
    <div id="chatLog" className="chatLog bg-gray-600 mx-auto lg:container">
      {messages.length === 0 ? <p className="text-center text-gray-400">No messages yet</p> : null}
      
      {messages.map((record, index) => {
        const messageKey = `${record.authorColor}-${record.key}`;
        return (
          <div key={messageKey}  className="message-container mb-2">
            <div className="message-header flex justify-between py-2 px-4 rounded-t" style={{backgroundColor:`#${record.authorColor}`}}>
              <span className="text-lg font-bold px-1 py-0.5 bg-white rounded" >{record.author}</span>
              <span>{record.time}</span>
            </div>

            <div className="message-content flex justify-between py-2 px-4 bg-gray-300 rounded-b-2xl">
              <span >{record.message}</span>
            </div>
            
            {/* <hr /> */}
          </div>
        )
      })}
    </div>
  )
}

export default WithConsumer(ChatLog);
