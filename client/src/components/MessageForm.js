
import React from 'react'
import WithConsumer from '../context/WithConsumer';







const MessageForm = ({context}) => {

  const onTextChange = e => {
    const newMessageState = { ...messageState, [e.target.name]: e.target.value };
    setMessageState( newMessageState );
    context[e.target.name] = e.target.value;
  }

  const [messageState, setMessageState] = React.useState({
    message: '',
    officialUserName: context.officialUserName,
    userName: context.userName,
    changingUserName: false,
    chatRecord: context.chatRecord,
  });
  
  setInterval( ()=>{ 
    if(context.chatRecord !== messageState.chatRecord){
      console.log('setting chat record')
      setMessageState({ ...messageState, chatRecord: context.chatRecord});
    }
  }, 1000)


  const toggleChangingName = () => {
    const newMessageState = { ...messageState, changingUserName: !messageState.changingUserName };
    setMessageState( newMessageState );
  }

  const changeName = () => {
    console.log('client side change name');
    const newMessageState = { ...messageState, officialUserName: messageState.userName, changingUserName: false };
    setMessageState( newMessageState );
    // toggleChangingName();
    context.userName = messageState.userName;
  }



  return (
    <div>
      {messageState.officialUserName === '' ? <h3>Change Your Name:</h3> : <h3>{messageState.officialUserName}</h3>}

      { messageState.changingUserName ? <div>
        <input type="text" value={messageState.userName} name="userName" onChange={ e => onTextChange(e) } />
        <button onClick={ changeName }>Submit Name</button>
      </div> : '' }


      <button onClick={toggleChangingName} >Change Name</button>
      {/* <h3>name</h3> */}


      <h4>Message:</h4>
      <input type="text" value={messageState.message} name="message" onChange={ e => onTextChange(e) } />
      <button onClick={context.sendMessage}>Send</button>

      <hr />
      <button onClick={e =>{console.log(messageState)}}>Log Message State</button>
      <button onClick={e =>{console.log(context)}}>Log Context</button>

    <div>
      <h2>Chat Log</h2>
      {/* {context.chatRecord.map((record, index) => { */}
      {messageState.chatRecord.map((record, index) => {
        return (
          <div key={index}>
            {/* <span>{record.user}:</span> */}
            <span>{record.message}</span>
          </div>
        )
      })}
    </div>


    </div>
  )
}

export default WithConsumer(MessageForm);
