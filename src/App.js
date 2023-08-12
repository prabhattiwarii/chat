import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Joinn from './component/Joinn';
import Chat from './component/Chat/Chat';


function App() {

  return (
    <div className="App">
       <BrowserRouter>
        <Routes>
          <Route path="/" Component={Joinn }/>
          <Route path='chat-room' Component={Chat}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
