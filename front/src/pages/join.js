import '../App.css'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function Join() {
    let navi = useNavigate()
    return (
        <> 
        < div className = "navi" > <div className="loginjoin-btn-box">
            <div
                className="loginjoin-btn"
                onClick={() => {
                    navi("/");
                }}>Home</div>
            <div 
                className="loginjoin-btn"
                onClick={() => {
                    navi("/login")
                }}>Login</div>
        </div>
    </div>
    <div className='join-box'>
        <div className='join-text'>Sign Up</div>
        <div className='joinform-box'>
            <div className='joinform-box01'>
                <div className='form-text'>Name*</div>
                <input type='text' className='form-field' placeholder='ex) 홍길동' id='name'/>
                <div className='form-text'>E-mail*</div>
                <input type='email' className='form-field' placeholder='ex) abc123@example.com' id='email'/>
                <div className='form-text'>Password*</div>
                <input type='password' className='form-field' placeholder='********' id='pw'/>
            </div>
            <div className='joinform-box02'>
                <button onClick={()=>{
                    console.log(document.querySelectorAll('.joinform-box01 input')[0].value,
                                document.querySelectorAll('.joinform-box01 input')[1].value,
                                document.querySelectorAll('.joinform-box01 input')[2].value);
                    // axios.post('http://127.0.0.1:8000/test',
                    //     {
                    //         id : document.querySelectorAll('.form-box01 input')[0].value,
                    //         pwd : document.querySelectorAll('.form-box01 input')[1].value
                    //     }
                    // )
                    // .then(res => console.log(res))
                    axios({
                        method: 'post',
                        url: 'http://127.0.0.1:8000/post',
                        data: {
                            'name' : document.querySelectorAll('.joinform-box01 input')[0].value,
                            'email' : document.querySelectorAll('.joinform-box01 input')[1].value,
                            'pwd' : document.querySelectorAll('.joinform-box01 input')[2].value
                        }

                    }).then(res => console.log(res))
                }}>Create account</button>
            </div>
        </div>
    </div>
</>
    );
}

export default Join;