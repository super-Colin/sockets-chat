import React from 'react'
import WithConsumer from '../context/WithConsumer'

const Login = (context) => {
  const submitName = (event) => {
    event.preventDefault()
    context.sendMessage;
    const name = event.target.name.value
    context.socket.emit('setName', name)
  }
  return (
    <form>
      <h1>Set Your Name</h1>
      <input type="text" name="userName" />
      <button onClick={ submitName }>Send</button>
    </form>
  )
}

export default WithConsumer(Login)
