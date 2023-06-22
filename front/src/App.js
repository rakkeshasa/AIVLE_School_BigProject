import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Main from './pages/main';
import Login from './pages/login';
import Join from './pages/join';
import Chat from './pages/chat';
import Blog from './pages/blog';
import { useState } from 'react';


function App() {
    const [filename, setFilename] = useState()
    const [upload, setUpload] = useState()
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path='/' element={<Main setFilename={setFilename} filename={filename} setUpload={setUpload}/>}/>
                    <Route path='/login' element={<Login/>}/>
                    {/* <Route path='/chat' element={<Chat filename={filename} upload={upload}/>}/> */}
                    <Route path='/join' element={<Join/>}/>
                    <Route path='/chat' element={<Chat/>}/>
                    <Route path='/blog' element={<Blog/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;