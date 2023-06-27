import styled from "styled-components";
import Login, { Background, Circle, LoginBtn, LoginContainer, LoginForm, LoginImgWrapper, LoginText, LoginTop } from "./login";
import { LoginWrapper} from "./login";
import vita from '../image/vita.png'
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Join = () => {
    const navi = useNavigate();
    const email = useRef();
    const password = useRef();
    const username = useRef();
    return(
        <>
            <LoginWrapper>
                <LoginImgWrapper imageUrl={vita}/>
                <Background><Circle/><Circle/></Background>
                <LoginContainer>
                    <LoginTop>Sign Up</LoginTop>
                    <LoginText>EMAIL</LoginText>
                    <LoginForm type="text" placeholder="e-mail을 입력하세요." ref={email}/>
                    <LoginText>PASSWORD</LoginText>
                    <LoginForm type="password" placeholder="비밀번호를 입력하세요." ref={password}/>
                    <LoginText>NAME</LoginText>
                    <LoginForm type="text" placeholder="이름을 입력하세요." ref={username}/>
                    <LoginBtn height={'9%'} onClick={() => {
                        console.log(email.current.value, password.current.value, username.current.value);
                        axios({
                            method: 'post',
                            url: 'http://127.0.0.1:8000/join',
                            data: {
                                'id' : email.current.value,
                                'pwd' : password.current.value,
                                'name': username.current.value
                            }
                        }).then(res => res ? navi('/') : console.log('회원가입 실패'))
                    }}>회원가입</LoginBtn>
                </LoginContainer>
            </LoginWrapper>
        </>
    )
}

export default Join;