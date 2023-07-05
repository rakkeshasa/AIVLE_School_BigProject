import { useEffect, useState } from 'react';
import '../App.css'
import {useNavigate} from 'react-router-dom';
import Chatting from '../components/chatting';
import axios from 'axios';

function Chat(props) {
    let navi = useNavigate();
    const [filenames, setFilenames] = useState([props.filename]);
    const [video, setvideo] = useState();
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    console.log(props.videoSummary);
    return (
        <div className='chat-wrapper'>
            <Chatting  videoSummary={props.videoSummary} upload={props.upload} setAnswer={props.setAnswer} answer={props.answer} chat={props.chat} video={video}/>
            <div className='question-wrapper'><div className='question-box'><input type='textarea' id='chat-question' 
            onKeyUp={(e)=>{
                e.target.value === ''? document.querySelector('.submit-button').classList.remove('active') : document.querySelector('.submit-button').classList.add('active');
                e.target.value === ''? document.querySelector('.material-symbols-outlined').classList.remove('active') : document.querySelector('.material-symbols-outlined').classList.add('active')
            }} onKeyDown={(e)=>{e.keyCode===13 && document.querySelector('.submit-button').click()}}>
                </input><div className='submit-button' onClick={()=>{
                document.querySelector('#chat-question').value === '' ? document.querySelector('.material-symbols-outlined').classList.remove('active') :props.setChat([...props.chat, document.querySelector('#chat-question').value]);
                props.setAnswer([...props.answer]);
                axios({
                    method: 'post',
                    url: 'http://127.0.0.1:8000/video2chat',
                    data: {
                        'question': document.querySelector('#chat-question').value,
                    }
                }).then((res)=>{
                    props.setAnswer([...props.answer, res.data.answer])
                    if(res.data.video !== ''){
                        const videoUrl = res.data.video
                        setvideo(videoUrl)
                    }
            })
                document.querySelector('#chat-question').value = '';
            }}><span class="material-symbols-outlined">
            send
            </span></div></div></div>
        </div>
    );
}

export default Chat;