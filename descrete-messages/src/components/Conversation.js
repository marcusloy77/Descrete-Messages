import { useState, useEffect } from 'react'
import '../Conversation.css'
import io from 'socket.io-client'
const socket = io.connect('http://localhost:3002')

const Conversation = ({friendName, loggedInUser}) => {
  //We want as display:
  //name at top
  //window with chat
  //input for messages at the bottom

  const [sentMessages, addSentMessages] = useState([])
  const [state, setState] = useState({message: '', name: ''})
  const [typedMessage, setTypedMessage] = useState('')

  useEffect(() => {
    socket.on('message', ({name, message}) => {
      console.log(name, message)
    })
  })  

  const sendMessage = (event) => {
    event.preventDefault()
    
    socket.emit('message', {name: loggedInUser, message: event.target.message.value})


    addSentMessages([...sentMessages, {message: event.target.message.value, sender: loggedInUser, side: 'right'}])
    setTypedMessage('')

  }

  const retrieveMessages = () => {

  }

  const handleTypedMessages = (event) => {
    const message = event.target.value
    setTypedMessage(message)
  }

  return (
    <section className='chat'>
      <h2>{friendName}</h2>
      <div className='chat-box'>
        <div className="chat-box1">
          <ul className='chat-stream'>{sentMessages.map((message, index) => {
          return <div key={index} className={message.side}>{message.message} from {message.sender}</div>
        })}</ul>
        </div>
        <div className="chat-box2">
          <ul className='chat-stream'>{sentMessages.map((message, index) => {
          return <div key={index} className={message.side}>{message.message} from {message.sender}</div>
        })}</ul>
        </div>
      </div>
      <form action="" onSubmit={sendMessage}>
        <input type="text" name='message' onChange={handleTypedMessages} value={typedMessage.message}/>
        <button>Send</button>
      </form>
    </section>
  )
}



export default Conversation