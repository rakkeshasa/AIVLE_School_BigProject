import '../App.css'
import { useNavigate } from 'react-router-dom';

function Chat(props) {
    let navi = useNavigate();
    console.log(props.filename);
    return (
        <div className='wrapper'> < div > <div className = "navi"> <div className="loginjoin-btn-box">
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
    <div className='chat-plus' onClick={()=>{
        document.getElementById('new-chat').click();
    }}>
        <div className='chat-plus-text01'>+ New Chat</div>
        <div className='chat-plus-text02'>Drop MP4 here</div>
    </div>
    <div></div>
</div>
</div>
    );
}

export default Chat;