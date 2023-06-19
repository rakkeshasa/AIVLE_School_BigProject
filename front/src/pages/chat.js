import '../App.css'
import {useNavigate} from 'react-router-dom';

function Chat(props) {
    let navi = useNavigate();
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
                        <div className="loginjoin-btn">Join</div>
                    </div>
                </div>
            </div>
            <div className='chat-left-bar'>
                <input type='file' id='new-chat'></input>
                <div
                    className='chat-plus'
                    onClick={() => {
                        document
                            .getElementById('new-chat')
                            .click();
                    }}>
                    <div className='chat-plus-text01'>+ New Chat</div>
                    <div className='chat-plus-text02'>Drop MP4 here</div>
                </div>
                <div className='file-title'>{props.filename}</div>
            </div>
            <div className='chat-wrapper'>
                <div className='chat-box'></div>
                <div className='question-wrapper'><div className='question-box'><input type='textarea' onKeyUp={(e)=>{
                    e.target.value === ''? document.querySelector('.submit-button').classList.remove('active') : document.querySelector('.submit-button').classList.add('active');
                    e.target.value === ''? document.querySelector('.material-symbols-outlined').classList.remove('active') : document.querySelector('.material-symbols-outlined').classList.add('active')
                }}></input><div className='submit-button'><span class="material-symbols-outlined">
                send
                </span></div></div></div>
            </div>
        </div>
    );
}

export default Chat;