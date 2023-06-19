import '../App.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function Join() {
    let navi = useNavigate()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');

    const handleNameChange = (event) =>{
        setName(event.target.value);
    }

    const handleEmailChange = (event) =>{
        setEmail(event.target.value);
    }

    const handlePwdChange = (event) =>{
        setPwd(event.target.value);
    }

    const handleSubmit = () => {
        axios({ 
            method: 'post',
            url: 'http://127.0.0.1:8000/post',
            data: {
                'name' : name,
                'id' : email,
                'pwd' : pwd
            }
        })
        .then(res => console.log(res))
        .catch(error => console.log(error));
        
        console.log(name, email, pwd)
    };

    const isDisabled = !name || !email || !pwd;
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
                        navi("/login")
                    }}>Login
                </div>
            </div>
            <div className='join-box'>
                <div className='join-text'>Sign Up</div>
                <div className='joinform-box'>
                    <div className='joinform-box01'>
                        <div className='form-text'>Name*</div>
                        <input 
                            type='text'
                            className='form-field'
                            placeholder='ex) 홍길동'
                            value={name}
                            onChange={handleNameChange}
                        />
                        <div className='form-text'>E-mail*</div>
                        <input
                            type='email'
                            className='form-field'
                            placeholder='ex) abc123@example.com'
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <div className='form-text'>Password*</div>
                        <input
                            type='password'
                            className='form-field'
                            placeholder='영문과 숫자 조합 8자리 이상 입력해주세요.'
                            value={pwd}
                            onChange={handlePwdChange}
                        />
                    </div>
                    <div className='joinform-box02'>
                        <button 
                            onClick={handleSubmit}
                            disabled={isDisabled}
                            >Create account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Join;