import { useEffect, useState } from 'react';
import '../App.css'
import {useNavigate} from 'react-router-dom';
import Chatting from '../components/chatting';
import axios from 'axios';

function Chat(props) {
    let navi = useNavigate();
    const init = props.filename+" 에 대한 질문을 해주세요"
    const [filenames, setFilenames] = useState([props.filename]);
    const [filenum, setFilenum] = useState(0);
    const [answer, setAnswer] = useState([init]);
    const [chat, setChat] = useState([]);
    return (
        <div className='wrapper'>
            < div >
                <div className="navi">
                    <div className="loginjoin-btn-box">
                        <div
                            className="loginjoin-btn"
                            onClick={() => {
                                navi("/");
                            }}>Home</div>
                        <div className="loginjoin-btn" onClick={()=>{
                            navi("/join");
                        }}>Join</div>
                    </div>
                </div>
            </div>
            <div className='chat-left-bar'>
                <input type='file' id='new-chat'
                   onChange={(e) => {
                    setFilenames([...filenames, e.currentTarget.files[0].name])
                    setFilenum(filenum+1);
                }}></input>
                <div
                    className='chat-plus'
                    onClick={() => {
                        document.getElementById('new-chat').click();
                    }}>
                    <div className='chat-plus-text01'>+ New Chat</div>
                    <div className='chat-plus-text02'>Drop MP4 here</div>
                </div>
                {filenames.map((filename)=><div className='file-title' onClick={()=>{

                }}>{filename}</div>)}
            </div>
            <div className='chat-wrapper'>
                <Chatting answer={answer} chat={chat}/>
                <div className='question-wrapper'><div className='question-box'><input type='textarea' id='chat-question' 
                onKeyUp={(e)=>{
                    e.target.value === ''? document.querySelector('.submit-button').classList.remove('active') : document.querySelector('.submit-button').classList.add('active');
                    e.target.value === ''? document.querySelector('.material-symbols-outlined').classList.remove('active') : document.querySelector('.material-symbols-outlined').classList.add('active')
                }} onKeyDown={(e)=>{e.keyCode===13 && document.querySelector('.submit-button').click()}}>
                    </input><div className='submit-button' onClick={()=>{
                    document.querySelector('#chat-question').value === '' ? document.querySelector('.material-symbols-outlined').classList.remove('active') :setChat([...chat, document.querySelector('#chat-question').value]);
                    setAnswer([...answer]);
                    axios({
                        method: 'post',
                        url: 'http://127.0.0.1:8000/video2chat',
                        data: {
                            'question': document.querySelector('#chat-question').value,
                        }
                    }).then(res=>{console.log(res);
                    setAnswer([...answer, res.data])})
                    console.log(answer);
                    document.querySelector('#chat-question').value = '';
                }}><span class="material-symbols-outlined">
                send
                </span></div></div></div>
            </div>
        </div>
    );
}

export default Chat;