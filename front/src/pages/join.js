import styled from "styled-components";
import Login, { Background, Circle, LoginBtn, LoginContainer, LoginForm, LoginImgWrapper, LoginText, LoginTop } from "./login";
import { LoginWrapper} from "./login";
import vita from '../image/vita.png'

const Join = () => {
    return(
        <>
            <LoginWrapper>
                <LoginImgWrapper imageUrl={vita}/>
                <Background><Circle/><Circle/></Background>
                <LoginContainer>
                    <LoginTop>Sign Up</LoginTop>
                    <LoginText>ID</LoginText>
                    <LoginForm type="text" placeholder="아이디를 입력하세요."/>
                    <LoginText>PASSWORD</LoginText>
                    <LoginForm type="password" placeholder="비밀번호를 입력하세요."/>
                    <LoginText>EMAIL</LoginText>
                    <LoginForm type="text" placeholder="e-mail을 입력하세요."/>
                    <LoginText>NAME</LoginText>
                    <LoginForm type="text" placeholder="이름을 입력하세요."/>
                    <LoginBtn height={'10%'}>회원가입</LoginBtn>
                </LoginContainer>
            </LoginWrapper>
        </>
    )
}

export default Join;