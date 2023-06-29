import '../App.css'
import {useNavigate} from 'react-router-dom';
import axios from "axios";

function Main(props) {
    let navi = useNavigate();
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
        <div className="upload-innner-box">
            <input type='file' id='upload' 
            onChange={(e)=>{
                const formData = new FormData()
                formData.append('video', e.currentTarget.files[0])
                formData.append('title', 'title')
                axios({
                    headers: {
                        "Content-Type": "multipart/form-data" // enctype 설정
                      },
                    method: 'post',
                    url: 'http://127.0.0.1:8000/video',
                    data: formData,
                }).then(res => res ? props.setUpload(1) : props.setUpload(0))
                props.setFilename(e.currentTarget.files[0].name);
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