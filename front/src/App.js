import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Main from './pages/main';
import Login from './pages/login';
import Join from './pages/join';
import Chat from './pages/chat';


function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path='/' element={<Main/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/join' element={<Join/>}/>
                    <Route path='/chat' element={<Chat/>}/>
                    <Route path='/join' element={<Join/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;