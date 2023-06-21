import '../App.css'
import {useNavigate} from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

function Login() {
    let navi = useNavigate()
    const [error, setError] = useState(null);

    const handleLogin = () => {
        const id = document.querySelectorAll('.form-box01 input')[0].value;
        const pwd = document.querySelectorAll('.form-box01 input')[1].value;

        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/login',
            data: {
                'id': document.querySelectorAll('.form-box01 input')[0].value,
                'pwd': document.querySelectorAll('.form-box01 input')[1].value
            }
        }).then(res => {
            console.log(res);
            // 로그인이 성공한 경우, main 페이지로 이동
            navi("/");
        }).catch(error => {
            if (error.response.status === 400) {
                if (error.response.data.error === 'wrong_idpw') {
                  setError("아이디 혹은 비밀번호가 맞지 않습니다.");
                } else {
                  setError("로그인에 실패했습니다. 다시 시도해주세요.");
                }
              } 
            else {
                setError("존재하지 않는 ID 입니다.");
            }
        });
    };
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
                            onClick={handleLogin}>Login
                        </button>
                        <button 
                            onClick={() => {
                                navi("/join");
                            }}>Create account
                        </button>
                    </div>
                </div>
            </div>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
}

export default Login;