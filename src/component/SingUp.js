
import React, { useRef, useState } from 'react'
import ReactModal from 'react-modal';

const SingUp = ({isOpen,setOpen}) => {
    const [subEmail, setSub] = useState();
    const subEmailEl = useRef();
    const [tell, setTell] = useState();
    const [name, setName] = useState();
    const [id, setId] = useState();
    const [pass, setPass] = useState();
    const [psMessage, setPsMessage] = useState('');
    const [tellMessage, setTellMessage] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    
    function changeMail(e) {

        var sub = e.target.value;
        setSub(sub);
        if (sub != 'defalut') {
            subEmailEl.current.value = sub;
        }
        else {
            subEmailEl.current.value = '';
        }
        /* setSub */
    }
    function checkPass(e) {
        pass == e.target.value ? setPsMessage('비밀번호가 같습니다.') : setPsMessage('비밀번호가 같지 않습니다.');
    }
    function checkTell(e) {
        var currentPhone = e.target.value;
        console.log();
        setTell(currentPhone);
        var currentPhoneCk = /[-]/;
        if (currentPhone.length == 11 && currentPhoneCk.test(currentPhone)) {
            setTellMessage('')
        }
        else {
            setTellMessage('올바른 형태가 아닙니다.')
        }
    }
    const closeSinupFn =()=>{
        setOpen(false);
    }

    return (
        <ReactModal isOpen={isOpen}>
            
                    <div className='form-box'>
                        <p>회원가입</p>
                        <form onSubmit={handleSubmit} >
                            <div className='id_box'>
                                <input type="text" placeholder='아이디를 입력하세요.' />
                                <button className='but'>중복확인</button>
                            </div>
                            <input type="password" onChange={(e) => setPass(e.target.value)} placeholder="비밀번호 입력" />

                            <input type="password" onChange={checkPass} placeholder="비밀번호 재입력" />
                            <p style={{ color: 'red' }}>{psMessage}</p>
                            <input type="text" onChange={(e) => setName(e.target.value)} placeholder="이름" />

                            <input type="text" onChange={checkTell} placeholder="전화번호 입력('-'를 제외한 11자리)" />
                            <p style={{ color: 'red' }}>{tellMessage}</p>
                            <div className='email-box'>
                                <input type="text" placeholder="이메일 주소 입력" />
                                <p>@</p>
                                <input type="text" disabled={subEmail == 'defalut' ? false : true} ref={subEmailEl} />
                                <select onChange={changeMail}>
                                    <option value='defalut'>직접입력</option>
                                    <option value='naver.com'>naver.com</option>
                                    <option value='gmail.com'>gmail.com</option>
                                </select>
                            </div>
                            <div className='btn-box'>
                                <button type='submit' value='제출하기'>가입</button>
                                <button onClick={closeSinupFn}>취소</button>
                            </div>
                        </form>
                    </div>
                

            
            </ReactModal>
    )
}

export default SingUp