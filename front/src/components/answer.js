import { useEffect, useRef, useState } from "react";
import styled, { keyframes, css } from "styled-components";

export const AnswerWrapper = styled.div`
    width: 90%;
    height: auto;
    display: flex;
    justify-content: left;
`
const AnswerBox = styled.div`
    display: flex;
    justify-content: left;
    z-index: -1;
    text-align: left;
    width: 25vw;
    height: auto;
    margin: 20px;
    padding: 15px;
    background-color: #C6E2E9;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.4);
    border-radius: 10px;
    color: #5B5B5B;
    font-family: 'Inter';
`

const fadeAnimation01 = keyframes`
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0;
    }
    100% {
        opacity: 0;
    }
`

const fadeAnimation02 = keyframes`
    0% {
        opacity: 0;
    }
    30% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
`

const fadeAnimation03 = keyframes`
    0% {
        opacity: 0;
    }
    60% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
`

const fadeAnimation04 = keyframes`
    0% {
        opacity: 0;
    }
    50% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`
const Loading01 = styled.div`
    background-color: black;
    width: 5px;
    height: 5px;
    border-radius: 5px;
    animation: ${fadeAnimation01} 2s infinite;
    display: ${props=>props.display};
`
const Loading02 = styled.div`
    background-color: black;
    width: 5px;
    height: 5px;
    border-radius: 5px;
    animation: ${fadeAnimation02} 2s infinite;
    display: ${props=>props.display};
`
const Loading03 = styled.div`
    background-color: black;
    width: 5px;
    height: 5px;
    border-radius: 5px;
    animation: ${fadeAnimation03} 2s infinite;
    display: ${props=>props.display};  
`

const Loading04 = styled.div`
    background-color: black;
    width: 5px;
    height: 5px;
    border-radius: 5px;
    animation: ${fadeAnimation04} 2s infinite;
    display: ${props=>props.display};  
`

const Answer = ({text}) => {
    const [animate, setAnimate] = useState(false);
    const answertxt = useRef();
    useEffect(() => {
        if (answertxt.current.textContent !== '') {
          setAnimate(true);
        } else {
            setAnimate(false);
        }
      }, [text]);

    return(
        <>
            <AnswerWrapper>
                <AnswerBox ref={answertxt}>
                <Loading01 display={animate ? 'none' : 'block'}/><Loading02 display={animate ? 'none' : 'block'}/><Loading03 display={animate ? 'none' : 'block'}/><Loading04 display={animate ? 'none' : 'block'}/>{text}</AnswerBox>
            </AnswerWrapper>
        </>
    );
}

export default Answer;