import Question from "./question";
import '../App.css'
import Answer from "./answer";
import { useEffect } from "react";
import { useRef } from "react";
import Video from "./video";
import Summary from "./summary";


const Chatting = (props) => {
    function autoScroll() {
        document.querySelector('.chat-box').scrollTo({
          top: document.querySelector('.chat-box').scrollHeight,  
          behavior: 'smooth' 
        });
      }
      useEffect(() => {
        autoScroll()
      }, [props.question, autoScroll]);
      
      const handleVideo = () => {
        document.querySelector('.react-player').style.display = 'none'
      }
    console.log(props.videoSummary);
    console.log(props.upload)
    console.log(props.video);

    return(
        <div className='chat-box'>
            {props.upload === 1 && <Summary videoSummary={props.videoSummary}/>}
            <button className="to-bottom-btn" onClick={()=>{autoScroll()}}>
            </button>
            {props.chat.map((question, index) => (
          <>
            {/* {props.video !== '' && props.setAnswer(['질문에 대한 영상입니다.',...props.answer])} */}
            {/* {props.video === '찾는 내용이 없습니다.' && props.setAnswer(['찾는 내용이 없습니다.',...props.answer])} */}
            <Question text={question}/>
            <Answer text={props.answer[index]} />
          </>
        ))}
          {props.video !== '' && <Video setvideo={props.setvideo} video={props.video}/>}
        </div>
    );
};


export default Chatting;