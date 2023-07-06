import styled from "styled-components";
import ProfileImg from '../image/profile.jpg';

export const Wrapper = styled.div`
    width: 90vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Container = styled.div`
    width: 500px;
    height: 600px;
    border-radius: 20px;
    background-color: white;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.4);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`
const Profile = styled.div`
    background-image: ${(props) => `url(${props.imageUrl})`};
    background-size: 80%;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.4);
    width: 250px;
    height: 250px;
    border-radius: 250px;
    background-position: center;
`
const ProfileText = styled.div`
    font-family: 'Nanum Gothic', sans-serif;
    width: 250px;
    height: 30px;
    text-align: left;
    color: #3E363F;
    border-bottom: solid #E5E5E5;
`
const Myinfo = (props) => {
    return(
        <>
            <Wrapper>
                <Container>
                    <Profile imageUrl={ProfileImg}/>
                    <ProfileText>VITA</ProfileText>
                    <ProfileText>안녕하세요</ProfileText>
                    <ProfileText>ID</ProfileText>
                    <ProfileText>{props.id}</ProfileText>
                    <ProfileText>NAME</ProfileText>
                    <ProfileText>{props.name}</ProfileText>
            </Container>
            </Wrapper>
        </>
    )
}

export default Myinfo;