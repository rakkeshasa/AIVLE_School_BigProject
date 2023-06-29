import styled from "styled-components";
import ProfileImg from '../image/profile.jpg';
const Wrapper = styled.div`
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
    justify-content: center;
`
const Profile = styled.div`
    background-image: ${(props) => `url(${props.imageUrl})`};
    background-size: cover;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.4);
    width: 250px;
    height: 250px;
    border-radius: 250px;
    background-position: center;
`
const ProfileText = styled.div`
    width: 250px;
    height: 50px;
    text-align: left;
`
const Myinfo = () => {
    return(
        <>
            <Wrapper>
                <Container>
                    <Profile imageUrl={ProfileImg}/>
                    <ProfileText>ID</ProfileText>
                    <ProfileText></ProfileText>
                    <ProfileText>PASSWORD</ProfileText>
                    <ProfileText></ProfileText>
                    <ProfileText>NAME</ProfileText>
                    <ProfileText></ProfileText>
            </Container>
            </Wrapper>
        </>
    )
}

export default Myinfo;