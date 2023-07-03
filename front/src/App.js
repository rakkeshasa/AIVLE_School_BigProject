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
import Loading from './components/loading';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function App() {
    const [filename, setFilename] = useState()
    const [upload, setUpload] = useState()
    const [userlogin, setUserlogin] = useState()
    const [page, setPage] = useState(0);
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path='/main' element={<Main setFilename={setFilename} filename={filename} setUpload={setUpload}/>}/>
                    <Route path='/login' element={<Login userlogin={userlogin} setUserlogin={setUserlogin} setPage={setPage}/>}/>
                    <Route path='/chat' element={<Chat filename={filename} upload={upload} userlogin={userlogin} setUserlogin={setUserlogin}/>}/>
                    <Route path='/' element={<Home setFilename={setFilename} filename={filename} setUpload={setUpload} userlogin={userlogin} setUserlogin={setUserlogin} setPage={setPage}/>}/>
                    <Route path='/join' element={<Join/>}/>
                    <Route path='/board' element={<Board/>}/>
                    <Route path='/mypage' element={<Mypage page={page} setPage={setPage}/>}/>
                    <Route path='/loading' element={<Loading/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
