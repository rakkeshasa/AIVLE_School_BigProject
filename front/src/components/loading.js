import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import styled, { keyframes } from "styled-components";


const Dummy = styled.div`
    position: fixed;
    top: 0;
    left: 10%;
    width: 90vw;
    height: 100vh;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: .2;
    pointer-events: none;
    z-index: 9999;
`
const LoadingBox = styled.div`
    position: absolute;
    top: 170px;
    left: 520px;
    width: 600px;
    height: 400px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const LoadingText = styled.div`
    width: 100%;
    height: 80px;
    margin-top: 30px;
    color: #FD6F22;
    font-family: 'Nanum Gothic', sans-serif;
`
const Loading = () => {
    return(
        <>
            <Dummy/>
            <LoadingBox>    
                <ClimbingBoxLoader color="#FD6F22"/>
                <LoadingText>동영상 처리 중입니다 잠시만 기다려주세요!</LoadingText>
            </LoadingBox>
        </>
    );
}

export default Loading