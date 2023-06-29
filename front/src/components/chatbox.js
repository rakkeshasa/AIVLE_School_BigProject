import Chatting from "./chatting";
import '../App.css';

const ChatBox = () => {
    return(
        <>
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
                    document.querySelector('#chat-question').value = '';
                    axios.post('http://127.0.0.1:8000/chat',document.querySelector('#chat-question').value).then(res=>{setAnswer([...answer, res])})
                }}><span class="material-symbols-outlined">
                send
                </span></div></div></div>
            </div>
        </>
    )
}

export default ChatBox; 