import '../App.css';
import styled from "styled-components";
import vita from '../image/vita.png';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import axios from 'axios';
import { useState } from 'react';
// import {useNavigate} from 'react-router-dom';
// import axios from 'axios';

// function Login() {
//     let navi = useNavigate()
//     return (
//         <> 
//         < div className = "navi" > <div className="loginjoin-btn-box">
//             <div
//                 className="loginjoin-btn"
//                 onClick={() => {
//                     navi("/");
//                 }}>Home</div>
//             <div className="loginjoin-btn">Join</div>
//         </div>
//     </div>
//     <div className='login-box'>
//         <div className='login-text'>Login</div>
//         <div className='form-box'>
//             <div className='form-box01'>
//                 <div className='form-text'>ID</div>
//                 <input type='text' className='form-field' placeholder='아이디' id='id'></input>
//                 <div className='form-text'>Password</div>
//                 <input type='password' className='form-field' placeholder='비밀번호' id='pw'></input>
//             </div>
//             <div className='form-box02'>
//                 <button onClick={()=>{
//                     console.log(document.querySelectorAll('.form-box01 input')[0].value,document.querySelectorAll('.form-box01 input')[1].value);
//                     // axios.post('http://127.0.0.1:8000/test',
//                     //     {
//                     //         id : document.querySelectorAll('.form-box01 input')[0].value,
//                     //         pwd : document.querySelectorAll('.form-box01 input')[1].value
//                     //     }
//                     // )
//                     // .then(res => console.log(res))
//                     axios({
//                         method: 'post',
//                         url: 'http://127.0.0.1:8000/post',
//                         data: {
//                             'id' : document.querySelectorAll('.form-box01 input')[0].value,
//                             'pwd' : document.querySelectorAll('.form-box01 input')[1].value
//                         }

//                     }).then(res => res === 'login' ? navi('/') : console.log('로그인 실패'))
//                 }}>Login</button>
//                 <button>Create account</button>
//             </div>
//         </div>
//     </div>
// </>
//     );
// }
export const LoginWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
    background-color: black;
    display: flex;
    font-family: 'Nanum Gothic', sans-serif;
    user-select: none;
`
export const LoginImgWrapper = styled.div`
    width: 60vw;
    height: 100vh;
    background-image: ${(props) => `url(${props.imageUrl})`};
    background-size: 50%;
    background-color: black;
    background-repeat: no-repeat;
    background-position: center;
`

export const LoginContainer = styled.div`
    height: 70vh;
    width: 25vw;
    background-color: rgba(255,255,255,0.13);
    position: absolute;
    transform: translate(-50%,-50%);
    top: 50%;
    left: 70%;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255,255,255,0.1);
    box-shadow: 0 0 40px rgba(8,7,16,0.6);
    padding: 50px 35px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1;
    &* {
        font-family: ‘Poppins’,sans-serif;
        color: #ffffff;
        letter-spacing: 0.5px;
        outline: none;
        border: none;
    }
`

export const LoginTop = styled.div`
    width: 100%;
    height: 20%;
    font-size: 300%;
    color: white;
`
export const LoginText = styled.div`
    width: 60%;
    height: 5%;
    color: white;
    text-align: left;
`
export const LoginForm = styled.input`
    width: 60%; 
    height: 6%; 
    margin-bottom: 4vh;  
    border-radius: 5px;
    padding: 5px;
`
export const LoginBtn = styled.div`
    width: 50%;
    height: ${(props)=>props.height};
    background-color: #FD6F22;
    color: white;
    margin: 2vh;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        cursor: pointer;
        background-color: #D94925;
    }
`

export const Background = styled.div`
    height: 75vh;
    width: 30vw;
    position: absolute;
    transform: translate(-50%,-50%);
    top: 50%;
    left: 72%;
    
`
export const Circle = styled.div`
    height: 200px;
    width: 200px;
    position: absolute;
    border-radius: 50%;
    &:first-child{
        Background: linear-gradient(
            #1845ad,
            #23a2f6
        );
        left: -80px;
        top: -80px;
    }
    &:last-child{
        Background: linear-gradient(
            to right,
            #ff512f,
            #f09819
        );
        right: -30px;
        bottom: -80px;
    }
`
const Login = (props) =>{
    const navi = useNavigate();
    const email = useRef();
    const password = useRef();
    const button = useRef();
    const [status, setStatus] = useState(true);
    return(
        <>
            <LoginWrapper>
            <LoginImgWrapper imageUrl={vita}/>
            <Background><Circle/><Circle/></Background>
            <LoginContainer>
                <LoginTop>Login</LoginTop>
                <LoginText>ID</LoginText>
                <LoginForm type='text' placeholder='이메일을 입력하세요.' ref={email} onKeyDown={(e)=>{
                    e.keyCode===13 && password.current.focus();
                }}/>
                <LoginText>PASSWORD</LoginText>
                <LoginForm type='password' placeholder='비밀번호를 입력하세요.' ref={password} onKeyDown={(e)=>{
                    e.keyCode===13 && button.current.click();
                }}/>
                <LoginBtn height={'8%'} ref={button} onClick={()=>{
                    console.log(email.current.value, password.current.value);
                    if(email.current.value===''){
                        setStatus('아이디를 입력하세요');
                        email.current.focus();
                    }else if(password.current.value===''){
                        setStatus('비밀번호를 입력하세요')
                        password.current.focus();
                    }else {
                     axios({
                         method: 'post',
                         url: 'http://127.0.0.1:8000/login',
                         data: {
                             'id' : email.current.value,
                             'pwd' : password.current.value
                         }
                     }).then((res)=>{
                        if(res.data['status'] === true){
                            props.setUserlogin(true)
                            sessionStorage.setItem('isLoggedIn', 'true')
                            sessionStorage.setItem('userId', res.data['session_id'])
                            sessionStorage.setItem('id2', res.data['id2'])
                            navi('/');
                        }else{
                            setStatus(res.data['status'])
                        }
                     })      
                }}}>로그인</LoginBtn>
                <LoginBtn height={'8%'} onClick={()=>{navi('/join')}}>회원가입</LoginBtn>
                <div className='login-alert'>{status}</div>
            </LoginContainer>
            </LoginWrapper>
        </>
    )
}

export default Login;