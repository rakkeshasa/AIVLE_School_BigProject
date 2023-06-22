import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Main from './pages/main';
import Login from './pages/login';
import Chat from './pages/chat';
import { useState } from 'react';
import Home from './pages/home';
import Join from './pages/join';

function App() {
    const [filename, setFilename] = useState()
    const [upload, setUpload] = useState()
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path='/main' element={<Main setFilename={setFilename} filename={filename} setUpload={setUpload}/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/chat' element={<Chat filename={filename} upload={upload}/>}/>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/join' element={<Join/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
