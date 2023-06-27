import styled from "styled-components"

const QuestionWrapper = styled.div`
    width: 90%;
    height: auto;
    display: flex;
    justify-content: right;
`
const QuestionBox = styled.div`
    z-index: -1;
    text-align: left;
    width: 25vw;
    height: auto;
    margin: 20px;
    padding: 15px;
    background-color: beige;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.4);
    border-radius: 10px;
`
const Question = ({text}) => {
    return(
        <>  
            <QuestionWrapper>
            <QuestionBox>{text}</QuestionBox>
            </QuestionWrapper>
        </>
    )
}

export default Question;