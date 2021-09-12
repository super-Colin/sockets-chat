
import React, {useEffect} from 'react'
import WithConsumer from '../context/WithConsumer';

import ChatLog from './ChatLog';






const MessageForm = ({context}) => {

  const [messageState, setMessageState] = React.useState({
    message: '',
    officialUserName: context.officialUserName,
    userName: context.userName,
    changingUserName: true,
    chatRecord: context.chatRecord,
  });

  context.socket.on('change_user_name_success', (data)=>{
    console.log('officializeChangeName', data.officialUserName);
    context.officialUserName = data.officialUserName;
    setMessageState({...messageState, officialUserName: data.officialUserName});
  })

  useEffect(() => {
    console.log('MessageForm useEffect');
  } , [context]);


  const onTextChange = e => {
    const newMessageState = { ...messageState, [e.target.name]: e.target.value };
    setMessageState( newMessageState );
    context[e.target.name] = e.target.value;
  }

  const toggleChangingName = () => {
    const newMessageState = { ...messageState, changingUserName: !messageState.changingUserName };
    setMessageState( newMessageState );
  }




  return (
    <div>
      <div className="flex flex-wrap justify-center my-6">
        {messageState.officialUserName === '' ? <h3 className="text-center text-4xl px-2 text-white underline" >Set Your Name To Send Messages:</h3> : <h3 className="text-center text-4xl px-2  text-white">{messageState.officialUserName}</h3>}
        
        {messageState.officialUserName === '' ? null :
          <button onClick={toggleChangingName} className="px-2 py-1 bg-yellow-600" >{ messageState.changingUserName ? 'Nevermind' : 'Change Name'}</button>
        }
        {/* <button onClick={toggleChangingName} className="self-end px-2 py-1 bg-yellow-600" >{ messageState.changingUserName ? 'Nevermind' : 'Change Name'}</button> */}
      </div>

      <div className="flex justify-center flex-wrap mb-6">
        { messageState.changingUserName ? <div className="flex flex-wrap justify-center">
          <input type="text" maxLength="10" value={messageState.userName} name="userName" onChange={ (e) => {onTextChange(e)} } className="px-2 py-1 bg-gray-300" />
          <button onClick={ e =>{ context.changeName(messageState.userName); if(messageState.userName !== ''){toggleChangingName()} } } className="px-2 py-1 bg-green-300" >Submit Name</button>
        </div> : null }

        <span className="flex-break my-1" />

        {/* <button onClick={toggleChangingName} className="px-2 py-1 bg-yellow-600" >{ messageState.changingUserName ? 'Nevermind' : 'Change Name'}</button> */}
      </div>



          <button onClick={e =>{console.log(messageState)}} className="bg-blue-300" >Log Message State</button>
          <button onClick={e =>{console.log(context)}} className="bg-pink-300" >Log Context</button>
      {/* <h2>Chat Log</h2> */}
      <ChatLog messages={messageState} />


      {/* <button onClick={()=>{
        console.log('sending test');
        context.socket.emit('test', {test:'test'})}
      } className="bg-red-700" >Test Socket</button> */}

      {messageState.officialUserName === '' ? null :
        <div className="flex flex-wrap justify-center px-2 py-1 mt-10 lg:container lg:mx-auto">

          <textarea type="text" value={messageState.message} name="message" onChange={ e => onTextChange(e) } className="w-full  h-40 px-2 py-1 bg-gray-100 border border-gray-500" placeholder="Message..." />
          <button onClick={ (e) =>{
            context.sendMessage();
            const newMessageState = { ...messageState, message : '' };
            context.message = '';
            setMessageState( newMessageState );
          }} className="text-2xl px-4 py-2 bg-green-300" >Send</button>

          <hr />
        </div>
      }

    </div>
  )
}

export default WithConsumer(MessageForm);
