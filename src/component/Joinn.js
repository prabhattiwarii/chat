import React from 'react'
import './Joiin.css'
import logo from '../images/logo.png'
import { Link } from 'react-router-dom'


let user;
const Joinn = () => {
    const sendUser = ()=>{
        user = document.getElementById("JoinInput").value;
        document.getElementById("JoinInput").value ="";
    }
  return (
    <div className='JoinPage'>
        <div className="JoinContainer">
        <img src={logo} alt="img" />
            <h1>Chat-Room</h1>
            <input type="text" id='JoinInput' placeholder='Enter Your Name'/>
            <Link to="/chat-room"><button className='loginbtn' onClick={sendUser}>Login</button></Link>
        </div>
    </div>
  )
}
export default Joinn;
export {user}
