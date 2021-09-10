
import React from 'react'
import WithConsumer from '../context/WithConsumer';







const MessageForm = ({context}) => {

  const onTextChange = e => {
    const newMessageState = { ...messageState, [e.target.name]: e.target.value };
    setMessageState( newMessageState );
    // console.log('official name is: ', context.officialUserName);
    context[e.target.name] = e.target.value;
    console.log('new State is: ', messageState)
  }

  const [messageState, setMessageState] = React.useState({
    message: '',
    officialUserName: context.officialUserName,
    userName: context.userName,
    changingUserName: false,
  });


  const toggleChangingName = () => {
    const newMessageState = { ...messageState, changingUserName: !messageState.changingUserName };
    setMessageState( newMessageState );
  }

  const changeName = () => {
    context.changeName();
    toggleChangingName();
  }



  return (
    <div>
      {/* { messageState.changingUserName ? <ChangeName /> : <h3>{context.officialUserName}</h3> } */}
      { messageState.changingUserName ? <div>
        <input type="text" value={messageState.userName} name="userName" onChange={ e => onTextChange(e) } />
        {/* <button onClick={ (e)=>{ context.changeName(e)} }>Change Name</button> */}
        <button onClick={ changeName }>Change Name</button>
      </div> : <h3>{context.officialUserName}</h3> }
      <button onClick={toggleChangingName} >Change Name</button>
      <h3>name</h3>


      <h4>Message:</h4>
      <input type="text" value={messageState.message} name="message" onChange={ e => onTextChange(e) } />
      <button onClick={context.sendMessage}>Send</button>
    </div>
  )
}

export default WithConsumer(MessageForm);
