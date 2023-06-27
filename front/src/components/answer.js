import styled from "styled-components";

const AnswerWrapper = styled.div`
    width: 90%;
    height: auto;
    display: flex;
    justify-content: left;
`
const AnswerBox = styled.div`
    z-index: -1;
    text-align: left;
    width: 25vw;
    height: auto;
    margin: 20px;
    padding: 15px;
    background-color: lightblue;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.4);
    border-radius: 10px;
`

const Answer = ({text}) => {
    return(
        <>
            <AnswerWrapper>
                <AnswerBox>{text}</AnswerBox>
            </AnswerWrapper>
        </>
    );
}

export default Answer;