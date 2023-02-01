import React from 'react'
import ReactModal from 'react-modal';


const Login = ({ isOpen, setOpen, setsinupOpen }) => {

    const close = () => (
        setOpen(false)
    )
    const sinup=()=>{
        setOpen(false);
        setsinupOpen(true);
    }
    
    return (
        <ReactModal isOpen={isOpen}>
            <div className='login-PopUp'>
                <p onClick={close}>닫기</p>
                <h3>구해줘 홈즈</h3>
                <div className='input-box'>
                    <input type='text' placeholder='아이디'></input>
                    <input type='password' placeholder='패스워드'></input>
                </div>
                <div className='button-box'>
                    <button>로그인</button>
                    <button onClick={sinup}>구해줘 홈즈 회원가입</button>
                </div>
            </div>
        </ReactModal>
    )
}

export default Login