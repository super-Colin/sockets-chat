import React, { useEffect } from 'react';
import WithConsumer from '../context/WithConsumer';

const ChatLog = ({context}) => {

  const [messages, setMessages] = React.useState([]);

    context.socket.on('chat_record', (data)=>{
      console.log('chat_record', data);
      // console.log('chat_record');
      context.chatRecord = data;
      setMessages(data);
      document.getElementById('chatLog').scrollTop = document.getElementById('chatLog').scrollHeight;
    })

  // useEffect(() => {
  //   console.log('chat updated');
  // }, [context])

  return (
    <div id="chatLog" className="chatLog">
      
      {messages.map((record, index) => {
        return (
          <div key={index}  className="message my-2">
            <div className="flex justify-between py-2 px-4" style={{backgroundColor:`#${record.authorColor}`}}>
              <span className="text-lg font-bold p-1 bg-white rounded" >{record.author}</span>
              <span>{record.time}</span>
            </div>

            <div className="flex justify-between py-2 px-4 bg-gray-300">
              <span >{record.message}</span>
            </div>
            
            <hr />
          </div>
        )
      })}
    </div>
  )
}

export default WithConsumer(ChatLog);
