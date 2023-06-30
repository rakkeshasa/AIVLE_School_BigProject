import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Main from './pages/main';
import Login from './pages/login';
import Chat from './pages/chat';
import { useState } from 'react';
import Home from './pages/home';
import Join from './pages/join';
import Mypage from './pages/mypage';
import Board from './pages/board';

function App() {
    const [filename, setFilename] = useState()
    const [upload, setUpload] = useState()
    const [userlogin, setUserlogin] = useState()
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path='/main' element={<Main setFilename={setFilename} filename={filename} setUpload={setUpload}/>}/>
                    <Route path='/login' element={<Login userlogin={userlogin} setUserlogin={setUserlogin}/>}/>
                    <Route path='/chat' element={<Chat filename={filename} upload={upload} userlogin={userlogin} setUserlogin={setUserlogin}/>}/>
                    <Route path='/' element={<Home setFilename={setFilename} filename={filename} setUpload={setUpload} userlogin={userlogin} setUserlogin={setUserlogin}/>}/>
                    <Route path='/join' element={<Join/>}/>
                    <Route path='/mypage' element={<Mypage/>}/>
                    <Route path='/board' element={<Board/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
