import '../App.css'
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const NaviBar = styled.div`
  width: 100%;
  height: 7vh;
  display: flex;
  justify-content: space-around; 
  align-items: center;
  background-color: black;
`

const BoardContainer = styled.div`
  height: calc(100vh - 7vh);
  overflow-x: hidden;
  font-family: 'Nanum Gothic', sans-serif;
  user-select: none;
  background-color: #f8f8f8;
  padding: 20px;
`

const PostList = styled.ul`
  padding: 100;
  margin: 150;
  list-style: none;
`

const PostItem = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  align-items: flex-start;
`

const PostTitle = styled.h3`
  font-size: 1.5rem;
  color: #333333;

`

const PostContent = styled.p`
  font-size: 1rem;
  color: #666666;
  display: ${({ isExpanded }) => (isExpanded ? 'block' : 'none')};
  margin-top: 10px;
`

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
`

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`

const TextArea = styled.textarea`
  width: 100%;
  height: 300px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
`

const Button = styled.button`
  padding: 10px 20px;
  background-color: #FD6F22;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 10px;
  &:hover {
    background-color: #D94925;
  }
`

const Checkbox = styled.input`
  margin-right: 10px;
`

const Board = () => {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', text: ''});
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [selectedPosts, setSelectedPosts] = useState([]);
  
  const openModal = () => {
    setModalOpen(true);
  }
  const closeModal = () => {
    setModalOpen(false);
    setNewPost({ title: '', text: '' });
  }

  const handleInputChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  }

  const createPost = () => {
    const createdPost = {
      id: posts.length + 1,
      title: newPost.title,
      text: newPost.text,
      // createdAt: new Date().toLocaleString(),
    };
    setPosts([...posts, createdPost]);
    closeModal();
  }

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/get_post')
      .then(response => {
        setPosts(response.data.PostList);
        console.log(posts);
      })
      .catch(error => {
        console.error(error);
      })
    })
    // 임시로 데이터를 생성하여 설정

  const togglePostContent = (postId) => {
    if (postId === expandedPostId) {
      // 이미 클릭된 게시글인 경우, 클릭 이벤트 무시
      return;
    }
    setExpandedPostId(postId);
  };

  const handlePostCheckboxChange = (postId) => {
    setSelectedPosts((prevSelectedPosts) => {
      if (prevSelectedPosts.includes(postId)) {
        return prevSelectedPosts.filter((id) => id !== postId);
      } else {
        return [...prevSelectedPosts, postId];
      }
    });
  }

  const deleteSelectedPosts = () => {
    setPosts((prevPosts) =>
      prevPosts.filter((post) => !selectedPosts.includes(post.id))
    );
    setSelectedPosts([]);
  }

  const DeleteCheckbox = ({ checked, onChange }) => {
    return (
      <input type="checkbox" checked={checked} onChange={onChange} />
    );
  }

  return (
    <>
      <NaviBar>
        
      </NaviBar>
      
      <BoardContainer>
        <PostList>
          {posts && posts.map((post) => (
            <PostItem key={post.id2} onClick={() => togglePostContent(post.id2)}>
              {/* {selectedPosts.includes(post.id2) && (
                <Checkbox
                  type="checkbox"
                  checked={true}
                  onChange={() => handlePostCheckboxChange(post.id2)}
                />
              )}
              {!selectedPosts.includes(post.id2) && (
                <Checkbox
                  type="checkbox"
                  checked={false}
                  onChange={() => handlePostCheckboxChange(post.id2)}
                />
              )} */}
              <PostTitle>{post.post_title}</PostTitle>
              <PostContent isExpanded={post.post_id === expandedPostId}>
                {post.post_text}
              </PostContent>
            </PostItem>
          ))}
        </PostList>
      
        <Button onClick={openModal}>Create Post</Button>

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
                value={newPost.post_title}
                onChange={handleInputChange}
                placeholder="Post Title"
              />
              <TextArea
                name="text"
                value={newPost.post_text}
                onChange={handleInputChange}
                placeholder="Post Content"
              ></TextArea>
              <Button onClick={createPost}>Create</Button>
              <br/>
              <Button onClick={closeModal}>Cancel</Button>
            </div>
          </div>
        </CustomModal>
        <br/>
        <Button onClick={deleteSelectedPosts}>Delete Selected Posts</Button>
      </BoardContainer>
    </>
  );
};

export default Board;