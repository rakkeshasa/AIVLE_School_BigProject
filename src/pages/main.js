import '../App.css'
import {useNavigate} from 'react-router-dom';
import Chat from './chat';
import { useState } from 'react';

function Main() {
    let navi = useNavigate();
    const [filename, setFilename] = useState()
    return (
        <> < div className = "navi" > <div className="loginjoin-btn-box">
            <div
                className="loginjoin-btn"
                onClick={() => {
                    navi("/login");
                }}>Login</div>
            <div className="loginjoin-btn">Join</div>
        </div>
    </div>
    <div className="title-box">
        <div className="title01">Chat with any</div>
        <div className="title02">MP4</div>
    </div>
    <div className="upload-outer-box">
        <div className="upload-innner-box" onClick={()=>{
            console.log(document.getElementById('upload').files.name);
        }}>
            <input type='file' id='upload' 
            onChange={()=>{
                setFilename(document.getElementById('upload').files[0]);
                console.log(filename);
                navi('/chat')
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