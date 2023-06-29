import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import Myinfo from "../components/myinfo"

const Wrapper = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
`
const MyPageLeftBar = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 10%;
    height: 100%;
    background-color: black;
`
const IconWrapper = styled.div`
    width: 100px;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &:hover {
        cursor: pointer;
    }
`
const TextWrapper = styled.div`
    height: 30px;
    color: white;
    &:hover {
        scale: 1.1;
    }
`
const Mypage = () => {
    const navi = useNavigate();
    const [page, setPage] = useState(0);
    const logpage = useRef();
    const categorypage = useRef();
    const myinfopage = useRef();
    useEffect(()=>{
        if(page === 0){
            logpage.current.style.color = '#FD6F22';
            categorypage.current.style.color = 'white';
            myinfopage.current.style.color = 'white';
        }else if(page === 1){
            categorypage.current.style.color = '#FD6F22';
            logpage.current.style.color = 'white';
            myinfopage.current.style.color = 'white';
        }else {
            logpage.current.style.color = 'white';
            categorypage.current.style.color = 'white';
            myinfopage.current.style.color = '#FD6F22';
        }
    })
    return(
        <>
            <Wrapper>
                <MyPageLeftBar>
                    <IconWrapper>
                    <TextWrapper onClick={()=>{
                        navi('/')
                    }}>Home</TextWrapper>
                    <span class="material-symbols-outlined" id="myinfo">Home</span>
                    </IconWrapper>
                    <IconWrapper>
                    <TextWrapper ref={logpage} onClick={()=>{setPage(0)}}>Log</TextWrapper>
                    <span class="material-symbols-outlined" id="myinfo">contract_edit</span>
                    </IconWrapper>
                    <IconWrapper>
                    <TextWrapper ref={categorypage} onClick={()=>{setPage(1)}}>Category</TextWrapper>
                    <span class="material-symbols-outlined" id="myinfo">category</span>
                    </IconWrapper>
                    <IconWrapper>
                    <TextWrapper ref={myinfopage} onClick={()=>{setPage(2)}}>My Info</TextWrapper>
                    <span class="material-symbols-outlined" id="myinfo">demography</span>
                    </IconWrapper>
                </MyPageLeftBar>
                {page === 2 && <Myinfo/>}
            </Wrapper>
        </>
    )
}

export default Mypage;