import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Main from './pages/main';
import Login from './pages/login';
import Chat from './pages/chat';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path='/' element={<Main/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/chat' element={<Chat/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
