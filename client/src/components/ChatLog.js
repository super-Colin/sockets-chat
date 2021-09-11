import React from 'react';
import WithConsumer from '../context/WithConsumer';

const ChatLog = ({context}) => {
  return (
    <div>
      <h2>Chat Log</h2>
      {context.chatRecord.map((record, index) => {
        return (
          <div key={index}>
            {/* <span>{record.user}:</span> */}
            <span>{record.message}</span>
          </div>
        )
      })}
    </div>
  )
}

export default WithConsumer(ChatLog);
