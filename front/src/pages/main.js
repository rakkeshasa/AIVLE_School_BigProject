import '../App.css'
import {useNavigate} from 'react-router-dom';
import Chat from './chat';
import { useEffect, useState } from 'react';
import axios from "axios";

// function reducer(currentState, action){
//     const newState = {...currentState}
//     return newState;
// }
// const store = createStore();
function Main() {
    let navi = useNavigate();
    const [filename, setFilename] = useState()
    useEffect(()=>{
        console.log(filename);
    }, [filename])
    return (
        <> < div className = "navi" > <div className="loginjoin-btn-box">
            <div
                className="loginjoin-btn"
                onClick={() => {
                    navi("/login");
                }}>Login</div>
            <div className="loginjoin-btn" onClick={()=>{
                axios({
                    method: 'get',
                    url: 'http://127.0.0.1:8000/test',
                    data: 'hello'
                }).then(result=>console.log(result))
            }}>Join</div>
        </div>
    </div>
    <div className="title-box">
        <div className="title01">Chat with any</div>
        <div className="title02">MP4</div>
    </div>
    <div className="upload-outer-box">
        <div className="upload-innner-box">
            <input type='file' id='upload' 
            onChange={(e)=>{
                setFilename(e.currentTarget.files[0].name);
            }}
            >
                
            </input>
            <div className="upload-center-box" onClick={()=>{
                document.getElementById('upload').click()
            }}>
                <div className="upload-img"></div>
                <div className="upload-text">Drop MP4 here</div>
            </div>
            <div className="upload-bottom-box">
                <div onClick={()=>{
                    document.getElementById('upload').click()
                }}>Browse my Computer</div>
                <div>From URL Find a MP4</div>
            </div>
        </div>
    </div>
</>
    );
}

export default Main;