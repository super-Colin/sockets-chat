
import React, {useEffect} from 'react'
import WithConsumer from '../context/WithConsumer';

import ChatLog from './ChatLog';
import ErrorBlock from './ErrorBlock';






const MessageForm = ({context}) => {
  const [errorState, setErrorState] = React.useState({ errorMessage:'', error:false});

  const [messageState, setMessageState] = React.useState({
    message: '',
    officialUserName: context.officialUserName,
    userName: context.userName,
    userColor: context.userColor,
    changingUserName: true,
    chatRecord: context.chatRecord,
  });

  context.socket.on('change_user_name_success', (data)=>{
    console.log('officializeChangeName', data.officialUserName);
    context.officialUserName = data.officialUserName;
    setMessageState({...messageState, officialUserName: data.officialUserName, userColor: data.officialUserColor});
  })

  context.socket.on('unsuccessful_message', (data)=>{
    setErrorState({errorMessage: data.errorMessage, error:true});
  })

  const changeUserName = e => {
    console.log('changeUserName messageState:', messageState);
    if(messageState.userName !== ''){
      context.changeName(messageState.userName);
      toggleChangingName();
    }else{
      setErrorState({errorMessage: "User name can't be blank", error:true});
    }
  }

  const onTextChange = e => {
    console.log('onTextChange messageState: ', `${[e.target.name]}: ${e.target.value}`, messageState);
    resetError();
    const newMessageState = { ...messageState, [e.target.name]: e.target.value };
    setMessageState( newMessageState );
    context[e.target.name] = e.target.value;
  }

  const toggleChangingName = () => {
    resetError();
    const newMessageState = { ...messageState, changingUserName: !messageState.changingUserName };
    setMessageState( newMessageState );
  }

  const submitMessage = () => {
    context.sendMessage();
    const newMessageState = { ...messageState, message : '' };
    context.message = '';
    setMessageState( newMessageState );
  }
  const resetError = () => {
    if(errorState.error){
      setErrorState({errorMessage:'', error:false});
    }
  }

  useEffect(()=>{
    const enterListener = (e) => {
      console.log(`dected ${e.code} key`);
      if (e.code === 'Enter' || e.code === 'NumpadEnter') {
        
        console.log('dected enter key')
        if(e.target.name === 'message') {
          console.log('ENTER submitMessagee');
          submitMessage();
        }else if(e.target.name === 'userName'){
          console.log('ENTER changeUserName');
          changeUserName();
        }
      }
    }
    document.addEventListener('keyup', enterListener);
    return () => {
      document.removeEventListener('keyup', enterListener);
    }

  }, [messageState]);


  return (
    <div>
      <div className="flex flex-wrap justify-center my-6 relative items-center lg:container mx-auto">
        {messageState.officialUserName === '' ? <h3 className="text-center text-4xl px-2  text-white underline" >Set Your Name To Send Messages:</h3> : <h3 className="text-center text-4xl px-2 border-2 rounded px-3 py-2 text-white" style={{borderColor: `#${messageState.userColor}`}} >{messageState.officialUserName}</h3>}
        
          <button onClick={toggleChangingName} className="sm:absolute right-0 px-3 py-2 bg-yellow-600" >{ messageState.changingUserName ? 'Nevermind' : 'Change Name'}</button>
        

      </div>
      { errorState.error ? <ErrorBlock errorMessage={errorState.errorMessage} /> : null }

      <div className="flex justify-center flex-wrap mb-6">
        { messageState.changingUserName ? <div className="flex flex-wrap justify-center">
          <input type="text" maxLength="10" value={messageState.userName} name="userName" onChange={onTextChange} className="px-2 py-1 bg-gray-300" />
          <button onClick={ changeUserName } className="px-2 py-1 bg-green-300" >Submit Name</button>
        </div> : null }

        <span className="flex-break my-1" />

      </div>



      <ChatLog messages={messageState} />



      {messageState.officialUserName === '' ? null :
        <div className="flex flex-wrap justify-center mt-10 lg:container lg:mx-auto">

          <textarea type="text" value={messageState.message} name="message" onChange={ onTextChange} className="w-full  h-40 px-2 py-1 bg-gray-100 border border-gray-500" placeholder="Message..." />
          <button onClick={ submitMessage } className="rounded text-2xl mt-2 px-4 py-2 bg-green-400" >Send</button>

          <hr />
        </div>
      }


    </div>
  )
}

export default WithConsumer(MessageForm);