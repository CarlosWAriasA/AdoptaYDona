
import React, { useState, useEffect, useRef } from "react";
import io from 'socket.io-client';
import "./form.css";  


const socket = io("http://localhost:3001");

const FormularioEnvioMensaje = () => {
   const [messages, setMessages] = useState([])
		const [messageInput, setMessageInput] = useState("")
		const [username, setUsername] = useState(() => {
			const loggedUserJSON = window.localStorage.getItem("user")
			if (
				loggedUserJSON &&
				Object.keys(JSON.parse(loggedUserJSON)).length > 0
			) {
				const user = JSON.parse(loggedUserJSON)
				const storedUsername = user.userName
				return storedUsername || "Invitado"
			}
		})

		const messageListRef = useRef(null)

		useEffect(() => {
			const handleChatMessage = (msg) => {
				setMessages((prevMessages) => [...prevMessages, msg])
			}

			socket.on("chat message", handleChatMessage)

			return () => {
				socket.off("chat message", handleChatMessage)
			}
		}, [])

		useEffect(() => {
			if (messageListRef.current) {
				scrollToBottom()
			}
		}, [messages])

		const handleChatMessage = (msg) => {
			setMessages((prevMessages) => [...prevMessages, msg])
		}

		const sendMessage = () => {
			if (messageInput.trim() !== "") {
				const message = {
					username,
					text: messageInput,
				}

				socket.emit("chat message", message)
				setMessageInput("")
			}
    }
  
  const scrollToBottom = () => {
		if (messageListRef.current) {
			messageListRef.current.scrollTop = messageListRef.current.scrollHeight
		}
	}


  return (
    <div className="phone-container">
      <div className="phone-header">
        <h2>Comunidad Adopta y Dona 🐶</h2>
      </div>
      <div className="message-list" ref={messageListRef}>
        <ul>
          {messages.map((msg, index) => (
            <li key={index} className="message-container">
              <div className="message-content">
                <p>{msg.username}: {msg.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="message-input">
        <input
          type="text"
          id="messageInput"
          placeholder="Escribe un mensaje..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          className="input-message"
        />
        <button onClick={sendMessage} className="send-button">
        💬 
        </button>
      </div>
    </div>
  );
};

export default FormularioEnvioMensaje;
