import Question from "./question";
import '../App.css'
import Answer from "./answer";
import { useEffect } from "react";
import { useRef } from "react";


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
      

    return(
        <div className='chat-box'>
            <button className="to-bottom-btn" onClick={()=>{autoScroll()}}>
            </button>
            {props.chat.map((question, index) => (
          <>
            <Question text={question}/>
            <Answer text={props.answer[index]} />
          </>
        ))}
        </div>
    );
};


export default Chatting;