import styled from "styled-components";
import { AnswerWrapper } from "./answer";

const SummaryBox = styled.div`
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
const Summary = (props) => {
    console.log(props.videoSummary);
    return(
        <>
            <AnswerWrapper>
                <SummaryBox>영상에 대한 요약입니다! <br></br> {props.videoSummary}</SummaryBox>
            </AnswerWrapper>
        </>
    )
}

export default Summary;