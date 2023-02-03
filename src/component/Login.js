import axios from 'axios';
import React, { useState } from 'react'
import ReactModal from 'react-modal';


const Login = ({ isOpen, setOpen, setsinupOpen }) => {
    const [values,setValues] = useState({
        id : '',
        pass : ''
    })
    const close = () => (
        setOpen(false)
    )
    const sinup=()=>{
        setOpen(false);
        setsinupOpen(true);
    }
    const changValueFn = (e)=>{
        setValues({
            ...values,[e.target.name]:e.target.value
        })
    }

    const loginFn=()=>{
        if(values.id && values.pass)
        axios.post("http://localhost:4000/login",{ id :values.id, pass :values.pass }).then((res)=>{
            if(res.data == '성공'){
                setOpen(false);
            }
            else{
                alert(res.data)
            }
        }).catch((e)=>{
            console.log(e);
        })
    }






    
    return (
        <ReactModal isOpen={isOpen}>
            <div className='login-PopUp'>
                <p onClick={close}>닫기</p>
                <h3>구해줘 홈즈</h3>
                <div className='input-box'>
                    <input type='text' placeholder='아이디' name = "id" value={values.id} onChange={changValueFn}></input>
                    <input type='password' placeholder='패스워드' name = "pass" value={values.pass} onChange={changValueFn}></input>
                </div>
                <div className='button-box'>
                    <button onClick={loginFn}>로그인</button>
                    <button onClick={sinup}>구해줘 홈즈 회원가입</button>
                </div>
            </div>
        </ReactModal>
    )
}

export default Login