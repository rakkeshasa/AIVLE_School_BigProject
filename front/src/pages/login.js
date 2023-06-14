import '../App.css'
import {useNavigate} from 'react-router-dom';

function Login() {
    let navi = useNavigate()
    return (
        <> 
        < div className = "navi" > <div className="loginjoin-btn-box">
            <div
                className="loginjoin-btn"
                onClick={() => {
                    navi("/");
                }}>Home</div>
            <div className="loginjoin-btn">Join</div>
        </div>
    </div>
    <div className='login-box'>
        <div className='login-text'>Login</div>
        <div className='form-box'>
            <div className='form-box01'>
                <div className='form-text'>ID</div>
                <input type='text' className='form-field' placeholder='아이디'></input>
                <div className='form-text'>Password</div>
                <input type='password' className='form-field' placeholder='비밀번호'></input>
            </div>
            <div className='form-box02'>
                <button>Login</button>
                <button>Create account</button>
            </div>
        </div>
    </div>
</>
    );
}

export default Login;