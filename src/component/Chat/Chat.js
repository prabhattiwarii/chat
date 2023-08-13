import React, { useEffect, useState } from 'react';
import { user } from '../Joinn';
import socketIo from "socket.io-client";
import sendImg from '../../images/msg.png';
import crossImg from '../../images/cros.png';
import './Chat.css';
import Message from '../Message/Message';
import ReactScrollToBottom from 'react-scroll-to-bottom'
import InputEmoji from 'react-input-emoji'

let socket;

const ENDPOINT = "http://localhost:4500/";

const Chat = () => {
    const [id, setId] = useState(""); 
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")

    const send = () => {
        if (newMessage.trim() !== "") {
            socket.emit('message', { message: newMessage, id }); 
            setNewMessage(""); 
        }
    }
    
    useEffect(() => {
        socket = socketIo(ENDPOINT, { transports: ['websocket'] });

        socket.on('connect', () => {
            console.log("Connected");
            setId(socket.id); 
            socket.emit('joined', { user });
        });

        socket.on('welcome', (data) => {
            setMessages(prevMessages => [...prevMessages, data]);
            console.log(data.user, data.message);
        });

        socket.on('userJoined', (data) => {
            setMessages(prevMessages => [...prevMessages, data]);
            console.log(data.user, data.message);
        });

        socket.on('leave', (data) => {
            setMessages(prevMessages => [...prevMessages, data]);
            console.log(data.user, data.message);
        });

        return () => {
            socket.off();
        };
    }, []);

    useEffect(() => {
        socket.on('sendMessage', (data) => {
            setMessages(prevMessages => [...prevMessages, data]);
            console.log(data.user, data.message, data.id);
        })
        return () => {
            socket.off();
        }
    }, [messages])

    const handleChange = (newMessage) => {
        setNewMessage(newMessage);
    }

    const handleChatClose = () => {
        window.location.href = '/';
    }

    return (
        <div className='chatPage'>
            <div className="chatContainer">
                <div className="header">
                    <h2>Chat-Room</h2>
                    <img src={crossImg} alt="close" onClick={handleChatClose}/>
                </div>
                <ReactScrollToBottom className="chatBox">
                    {messages.map((item, i) => (
                        <Message key={i} user={item.id === id ? '' : item.user} message={item.message} classs={item.id === id ? 'right' : 'left'} />
                    ))}
                </ReactScrollToBottom>
                <div className="inputBox">
                    <InputEmoji value={newMessage} onChange={handleChange} onEnter={send}/>
                    <button onClick={send} id='sendBtn'><img src={sendImg} alt="" disabled={newMessage.trim() === ""}/></button>
                </div>
            </div>
        </div>
    );
}

export default Chat;
