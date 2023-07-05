import styled from "styled-components";
import { Wrapper } from "./myinfo";
import Row from "./row";
import profile from '../image/profile.jpg'

const Container = styled.div`
    width: 1000px;
    height: 600px;
    border-radius: 20px;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
`
const LogLeft = styled.div`
    width: 300px;
    height: 600px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.4);
    border-radius: 20px 0 0 20px;
`
const LogLeftTextBox = styled.div`
    width: 300px;
    height: 300px;
    font-family: 'Nanum Gothic', sans-serif;
    color: #3E363F;;
    display: flex;
    flex-direction: column;
    justify-content: top;
    align-items: center;
`
const Profile = styled.div`
    width: 200px;
    height: 200px;
    border: solid #E5E5E5;
    border-radius: 200px;
    background-image: ${(props) => `url(${props.imageUrl})`};
    background-size: 80%;
    background-position: center;
`
const LogContainer = styled.div`
    width: 800px;
    height: 100%;
    font-family: 'Nanum Gothic', sans-serif;
    color: #3E363F;
    overflow: scroll;
`

const Log = (props) => {
    const divStyle = {
        width: '150px',
        heigth: '150px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottom: 'solid #E5E5E5',
        padding: '10px'
      };

    return(
        <>
            <Wrapper>
                <Container>
                    <LogLeft><Profile imageUrl={profile}/><LogLeftTextBox><div style={divStyle}>{props.name}님의</div><br></br><div>로그를 확인하세요</div></LogLeftTextBox></LogLeft>
                    <LogContainer>
                    {props.title.map((title, idx)=>
                        <Row title={title} category={props.category[idx]} idx={idx} setAnswer={props.setAnswer} setChat={props.setChat} setPage={props.setPage} page={props.page}/>
                    )}
                    </LogContainer>
                </Container>
            </Wrapper>
        </>
    )
}

export default Log;