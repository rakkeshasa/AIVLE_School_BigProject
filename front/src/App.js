import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Main from './pages/main';
import Login from './pages/login';
import Chat from './pages/chat';
import { useState } from 'react';

function App() {
    const [filename, setFilename] = useState()
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path='/' element={<Main setFilename={setFilename} filename={filename}/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/chat' element={<Chat filename={filename}/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
