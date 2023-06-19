import '../App.css'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

function Login() {
    let navi = useNavigate()

    return (
        <div className = "navi"> 
            <div className="loginjoin-btn-box">
                <div
                    className="loginjoin-btn"
                    onClick={() => {
                        navi("/");
                    }}>Home
                </div>
                <div 
                    className="loginjoin-btn"
                    onClick={() => {
                        navi("/join");
                    }}>Join
                </div>
            </div>
    
            <div className='login-box'>
                <div className='login-text'>Login</div>
                <div className='form-box'>
                    <div className='form-box01'>
                        <div className='form-text'>ID</div>
                        <input 
                            type='email'
                            className='form-field'
                            placeholder='이메일'
                            id='id'
                        />
                        <div className='form-text'>Password</div>
                        <input 
                            type='password'
                            className='form-field'
                            placeholder='비밀번호'
                            id='pw'
                        />
                    </div>
                    <div className='form-box02'>
                        <button 
                            onClick={()=>{
                                axios({
                                    method: 'post',
                                    url: 'http://127.0.0.1:8000/post',
                                    data: {
                                        'id' : document.querySelectorAll('.form-box01 input')[0].value,
                                        'pwd' : document.querySelectorAll('.form-box01 input')[1].value
                                    }
                                }).then(res => console.log(res))
                            }}>Login
                        </button>
                        <button 
                            onClick={() => {
                                navi("/join");
                            }}>Create account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;