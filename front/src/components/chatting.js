import Question from "./question";
import '../App.css'
import Answer from "./answer";
import { useEffect } from "react";


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
            <div className='answer-container'>
                {props.answer.map(answer=><Answer text={answer}/>)}</div>
                {props.chat.map(question=><Question text={question}/>)}
        </div>
    );
};


export default Chatting;