import axios from "axios";
import { useNavigate } from "react-router-dom";
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

const Row = (props) =>{
    const navi = useNavigate();
    return(
        <>
            <Container>
                <Title onClick={() => {
                    props.setPage(0)
                    navi('/mypage')
                    console.log(props.page);
                    console.log(props.idx);
                    axios.get(`http://127.0.0.1:8000/getChat?idx=${props.idx}`)
                    .then((res) => {
                        props.setAnswer(res.data['answer'])
                        props.setChat(res.data['question'])
                        props.setPage(0)
                        navi('/mypage')
                    })
                }}>{props.title}</Title><Category>{props.category}</Category>
            </Container>
        </>
    )
}

export default Row;