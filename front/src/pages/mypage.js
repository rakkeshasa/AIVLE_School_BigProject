import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import Myinfo from "../components/myinfo"
import axios from "axios"
import Log from "../components/log"
import Categroy from "../components/category"
import Chat from "./chat"
import Loading from "../components/loading"

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
const Mypage = (props) => {
    const navi = useNavigate();
    const logpage = useRef();
    const categorypage = useRef();
    const myinfopage = useRef();
    const chatpage = useRef();
    const [title, setTitle] = useState([]);
    const [category, setCategory] = useState([]);
    const [id, setId] = useState();
    const [pw, setPw] = useState();
    const [name, setName] = useState();
    const [answer, setAnswer] = useState([]);
    const [chat, setChat] = useState([]);
    
    console.log(props.upload);

    useEffect(()=>{
        if(props.page === 0){
            chatpage.current.style.color = '#FD6F22';
            categorypage.current.style.color = 'white';
            logpage.current.style.color = 'white';
            myinfopage.current.style.color = 'white';
        }else if(props.page === 1){
            chatpage.current.style.color = 'white';
            categorypage.current.style.color = '#FD6F22';
            logpage.current.style.color = 'white';
            myinfopage.current.style.color = 'white';
            props.setUpload(1)
        }else if(props.page === 2){
            chatpage.current.style.color = 'white';
            categorypage.current.style.color = 'white';
            logpage.current.style.color = '#FD6F22';
            myinfopage.current.style.color = 'white';
            props.setUpload(1)
        }else {
            chatpage.current.style.color = 'white';
            categorypage.current.style.color = 'white';
            logpage.current.style.color = 'white';
            myinfopage.current.style.color = '#FD6F22';
            props.setUpload(1)
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
                    <span class="material-symbols-outlined" onClick={()=>{props.setUpload(1)}}>Home</span>
                    </IconWrapper>
                    <IconWrapper>
                    <TextWrapper ref={chatpage} onClick={()=>{
                        props.setPage(0)
                        setAnswer(answer)
                        setChat(chat)
                        }}>Chat</TextWrapper>
                    <span class="material-symbols-outlined">forum</span>
                    </IconWrapper>
                    <IconWrapper>
                    <TextWrapper ref={categorypage} onClick={()=>{
                        axios.get('http://127.0.0.1:8000/getCategory')
                        .then((res)=>{
                            
                        })
                        props.setPage(1)}}>Category</TextWrapper>
                    <span class="material-symbols-outlined">category</span>
                    </IconWrapper>
                    <IconWrapper>
                    <TextWrapper ref={logpage} onClick={()=>{
                        props.setPage(2)
                        axios({
                            method: 'get',
                            url: 'http://127.0.0.1:8000/getLog'
                        }).then((res) => {
                            setName(res.data['id'])
                            setTitle(res.data['title'])
                            setCategory(res.data['category'])
                        })
                        }}>Log</TextWrapper>
                    <span class="material-symbols-outlined">contract_edit</span>
                    </IconWrapper>
                    <IconWrapper>
                    <TextWrapper ref={myinfopage} onClick={()=>{
                        props.setPage(3)
                        axios.get('http://127.0.0.1:8000/mypageinfo')
                        .then((res)=>{
                            setId(res.data['id'])
                            setPw(res.data['password'])
                            setName(res.data['name'])
                        })
                        }}>My Info</TextWrapper>
                    <span class="material-symbols-outlined" id="myinfo">demography</span>
                    </IconWrapper>
                </MyPageLeftBar>
                {props.page === 0 && <Chat videoSummary={props.videoSummary} answer={answer} setAnswer={setAnswer} chat={chat} setChat={setChat} />}
                {props.page === 1 && <Categroy/>}
                {props.page === 2 && <Log title={title} category={category} name={name} setAnswer={setAnswer} setChat={setChat} setPage={props.setPage} page={props.page}/>}
                {props.page === 3 && <Myinfo id={id} pw={pw} name={name}/>}
                {props.upload === 0 ? <Loading/> : console.log('처리 완료')}
            </Wrapper>
        </>
    )
}

export default Mypage;