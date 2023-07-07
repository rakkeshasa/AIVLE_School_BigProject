import '../App.css';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import logoImg from '../image/logo.png';

const NaviBar = styled.div`
  width: 100%;
  height: 7vh;
  display: flex;
  justify-content: space-around; 
  align-items: center;
  background-color: black;
`;

const Logo = styled.div`
  width: 10%;
  height: 100%;
  background-image: ${(props) => `url(${props.imageUrl})`};
  background-repeat: no-repeat;
  background-size: 60%;
  background-position: center;
  &:hover{
    cursor: pointer;
  }
`;

const Wrapper = styled.div`
  height: 100vh;
  overflow-y: scroll;
  font-family: 'Nanum Gothic', sans-serif;
  user-select: none;
`;

const LoginBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 114px;
  height: 33px;
  background-color: #FD6F22;
  border-radius: 10px;
  color: white;

  &:hover {
    cursor: pointer;
    background-color: #D94925;
  }
`;

const BoardContainer = styled.div`
  height: calc(100vh - 7vh);
  font-family: 'Nanum Gothic', sans-serif;
  user-select: none;
  background-color: #f8f8f8;
  padding: 20px;
`;

const PostList = styled.ul`
  padding: 100;
  margin: 150;
  list-style: none;
`;

const PostItem = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  align-items: flex-start;
`;

const PostTitle = styled.h3`
  width: 100%;
  display: flex;
  justify-content: space-around;
  font-size: 1.5rem;
  color: #333333;
  cursor: pointer;
`;

const PostContent = styled.p`
  font-size: 1rem;
  color: #666666;
  display: ${({ isExpanded }) => (isExpanded ? 'block' : 'none')};
  margin-top: 10px;
`;

const CustomModal = styled(Modal)`
  .modal {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: none;
    background-color: rgba(0, 0, 0, 0.4);
  }

  .modal.show {
    display: block;
  }

  .modal_body {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 400px;
    height: 600px;
    padding: 40px;
    text-align: center;
    background-color: rgb(255, 255, 255);
    border-radius: 10px;
    box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
    transform: translateX(-50%) translateY(-50%);
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 300px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #FD6F22;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 20px;
  &:hover {
    background-color: #D94925;
  }
`;

const Board = () => {
  const navi = useNavigate();
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({title: '', text: ''});
  const [expandedPostId, setExpandedPostId] = useState(null);
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  const id2 = sessionStorage.getItem('id2')

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/blog/get_post');
        setPosts(response.data);
        console.log(response.data); // 가져온 데이터를 콘솔에 출력합니다.
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  const togglePostContent = (postId) => {
    if (postId === expandedPostId) {
      setExpandedPostId(null); 
    } else {
      setExpandedPostId(postId);
    }
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setNewPost({ title: '', text: '' });
  };

  const handleInputChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const createPost = async () => {
    if(!newPost.title || !newPost.text){
      alert("제목과 내용을 입력해주세요.");
      return;
    }
    console.log(sessionStorage);
    
    try {
      const response = await axios.post('http://127.0.0.1:8000/blog/create_post', {
        id2: id2,
        title: newPost.title,
        text: newPost.text
      });
      console.log(response.data); // 생성된 게시물 데이터 출력
      // 모달 닫기 및 초기화
      closeModal();
      const fetchResponse = await axios.get('http://127.0.0.1:8000/blog/get_post');
      const updatedPosts = fetchResponse.data;
      setPosts(updatedPosts);
    } catch (error) {
      console.error(error);
    }
  };

  const deletePost = async (postId) => {
    try {
      const config = {
        data: { postId }, // 삭제 요청에 필요한 데이터 전달
      };
      console.log(config); // 확인용 console.log 추가
  
      const response = await axios.get('http://127.0.0.1:8000/blog/get_post');
      const selectedPost = response.data.find((post) => post.id === postId);
      if (selectedPost.id2 !== sessionStorage.getItem('id2')) {
        alert("게시물 삭제 권한이 없습니다.");
        return;
      }
  
      await axios.delete(`http://127.0.0.1:8000/blog/delete_post/${postId}/`, config);
      const filteredPosts = posts.filter((post) => post.id !== postId);
      setPosts(filteredPosts);
    } catch (error) {
      console.error(error);
    }
  };

  const createComment = async (postId) => {
    if(!newPost.title || !newPost.text){
      alert("제목과 내용을 입력해주세요.");
      return;
    }
    console.log(sessionStorage);
    
    try {
      const response = await axios.post('http://127.0.0.1:8000/blog/comment', {
        id2: id2,
        title: newPost.title,
        text: newPost.text
      });
      console.log(response.data); // 생성된 게시물 데이터 출력
      // 모달 닫기 및 초기화
      closeModal();
      const fetchResponse = await axios.get('http://127.0.0.1:8000/blog/get_post');
      const updatedPosts = fetchResponse.data;
      setPosts(updatedPosts);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <Wrapper>
        <NaviBar>
          <Logo imageUrl={logoImg} onClick={()=>{navi('/')}}/>
          <div className="home-top-btn-container">
            {isLoggedIn && (
              <>
                <LoginBox onClick={() => {
                  axios.get('http://127.0.0.1:8000/logout');
                  sessionStorage.setItem('isLoggedIn', 'false');
                  /* eslint-disable no-restricted-globals */
                  setTimeout(() => {
                    location.reload();
                  }, 1000);
                }}>로그아웃</LoginBox>
                <LoginBox onClick={() => navi('/mypage')}>마이페이지</LoginBox>
              </>
            )}
            {!isLoggedIn && (
              <>
                <LoginBox onClick={() => navi('/login')}>로그인</LoginBox>
                <LoginBox onClick={() => navi('/join')}>회원가입</LoginBox>
              </>
            )}
          </div>
        </NaviBar>

        <BoardContainer>
          <PostList>
            {posts.map((post) => (
              <PostItem key={post.id}>
                <PostTitle onClick={() => togglePostContent(post.id)}><div>{post.title}</div><div>{post.writer}</div></PostTitle>
                  <PostContent isExpanded={post.id === expandedPostId}>
                    {post.text}
                    <Input
                      type="text"
                      name="title"
                      value={newPost.title}
                      onChange={handleInputChange}
                      placeholder="댓글"
                    /><Button onClick={createComment}>작성</Button>
                  </PostContent>
                  {/* {isLoggedIn && <Button onClick={() => deletePost(post.id)}>delete</Button>} */}
              </PostItem>
            ))}
          </PostList>

          {isLoggedIn && <Button onClick={openModal}>Create Post</Button>}

          <CustomModal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            className="custom-Modal"
            overlayClassName="custom-ModalOverlay"
          >
            <div className="modal show">
              <div className="modal_body">
                <h2>새 글쓰기</h2>
                <Input
                  type="text"
                  name="title"
                  value={newPost.title}
                  onChange={handleInputChange}
                  placeholder="제목"
                />
                <TextArea
                  name="text"
                  value={newPost.text}
                  onChange={handleInputChange}
                  placeholder="내용"
                ></TextArea>
                <Button onClick={createPost}>Create</Button>
                <br />
                <Button onClick={closeModal}>Cancel</Button>
              </div>
            </div>
          </CustomModal>

        </BoardContainer>
      </Wrapper>
    </>
  );
};

export default Board;