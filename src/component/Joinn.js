import React, { useState } from 'react';
import './Joiin.css';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';

let user = "";

const sendUser = () => {
    user = document.getElementById("JoinInput").value;
    document.getElementById("JoinInput").value = "";
};

const Joinn = () => {
    const [name, setName] = useState("");

    return (
        <div className='JoinPage'>
            <div className="JoinContainer">
                <img src={logo} alt="img" />
                <h1>Chat-Room</h1>
                <input type="text" id='JoinInput' placeholder='Enter Your Name' onChange={(e) => setName(e.target.value)} />
                <Link onClick={(e) => !name ? e.preventDefault() : null} to="/chat-room"><button className='loginbtn' onClick={sendUser}>Login</button></Link>
            </div>
        </div>
    );
};

export default Joinn;
export { user };
