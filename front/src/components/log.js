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
`
const Profile = styled.div`
    width: 150px;
    height: 150px;
    border: solid #E5E5E5;
    border-radius: 150px;
    background-image: ${(props) => `url(${props.imageUrl})`};
    background-size: 80%;
    background-position: center;
`
const LogContainer = styled.div`
    width: 800px;
    height: 100%;
`
const Log = (props) => {
    return(
        <>
            <Wrapper>
                <Container>
                    <LogLeft><Profile imageUrl={profile}/><LogLeftTextBox>log</LogLeftTextBox></LogLeft>
                    <LogContainer>
                    {props.title.map((title, idx)=>
                        <Row title={title} category={props.category[idx]}/>
                    )}
                    </LogContainer>
                </Container>
            </Wrapper>
        </>
    )
}

export default Log;