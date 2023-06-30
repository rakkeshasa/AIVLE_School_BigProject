import styled from "styled-components";

const Container = styled.div`
    width: 700px;
    height: 80px;
    display: flex;
    justify-content: space-around;
    align-items: center;
`
const Title = styled.div`
    width: 400px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.4);
    &:hover {
        cursor: pointer;
    }
`
const Category = styled.div`
    width: 200px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.4);
`
const Row = ({title, category}) =>{
    return(
        <>
            <Container>
                <Title>{title}</Title><Category>{category}</Category>
            </Container>
        </>
    )
}

export default Row;