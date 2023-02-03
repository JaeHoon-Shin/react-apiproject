
import axios from 'axios';
import React, { useRef, useState } from 'react'
import ReactModal from 'react-modal';

const SingUp = ({ isOpen, setOpen }) => {
    const [subEmail, setSub] = useState('defalut');
    const subEmailEl = useRef();
    const [idchecked, setIdcheck] = useState(false);
    const [pass, setPass] = useState();
    const [psMessage, setPsMessage] = useState();
    const [tellMessage, setTellMessage] = useState();
    //멤버 정보
    const [member, setMember] = useState({
        id: "",
        pass: "",
        name: "",
        tel: "",
        email: ""
    })
    //유효성검사 체크
    const [check, setCheck] = useState({
        id: false,
        pass: false,
        tel: false,
    })

    //이메일 
    function changeMail(e) {
        var sub = e.target.value;
        setSub(sub);
        if (sub != 'defalut') {
            subEmailEl.current.value = sub;
            
        }
        else {
            subEmailEl.current.value = '';
        }

    }
    // 패스워드 유효성
    function checkPass(e) {
        if (pass == e.target.value) {
            setMember({ ...member, pass: e.target.value });
            setPsMessage('비밀번호가 같습니다.');
            setCheck(true);
        } else {
            setPsMessage('비밀번호가 같지 않습니다.');
        }
    }
    // 전화번호 유효성
    function checkTell(e) {
        var currentPhone = e.target.value;
        var currentPhoneCk = /[-]/;
        if (currentPhone.length == 11 && !currentPhoneCk.test(currentPhone)) {
            setTellMessage('')
            setCheck(true);
            setMember({ ...member, tel: e.target.value });
        }
        else {
            setTellMessage('올바른 형태가 아닙니다.');
        }
    }
    //동일 아이디 확인
    const idCheck = (e) => {
        e.preventDefault();
        if (member.id) {
            axios.post("http://localhost:4000/idCheck", { id: member.id }).then((res) => {
                console.log(res.data)
                if(res.data){
                    setIdcheck(true);
                    alert('사용가능합니다.');
                }else{
                    alert('같은 아이디가 있습니다.');
                }
            }).catch();
        }
        else {
            alert('아이디를 입력하세요.');
        }
    }

    // 가입하기
    const handleSubmit = (e) => {
        e.preventDefault();
        member.email = member.email + "@" + subEmail
        console.log(idchecked)

        if (member.id && member.pass && member.name && member.email && member.tel && idchecked) {
            axios.post("http://localhost:4000/singUp", { id: member.id, pass: member.pass, name: member.name, tel: member.tel, email: member.email }).
                then((res) => {
                    console.log('회원가입성공')
                }).catch();
        } else {
            alert('입력되지 않은 정보가 있습니다.')
        }
        setMember({
            id: "",
            pass: "",
            name: "",
            tel: "",
            email: ""
        });
        setIdcheck(false);
    }

    //모달 닫기
    const closeSinupFn = () => {
        setOpen(false);
    }

    return (
        <ReactModal isOpen={isOpen}>

            <div className='form-box'>
                <p>회원가입</p>
                <form onSubmit={handleSubmit} >
                    <div className='id_box'>
                        <input type="text" placeholder='아이디를 입력하세요.' onChange={(e) => setMember({ ...member, id: e.target.value })} />
                        <button className='but' onClick={idCheck}>중복확인</button>
                    </div>
                    <input type="password" onChange={(e) => setPass(e.target.value)} placeholder="비밀번호 입력" />

                    <input type="password" onChange={checkPass} placeholder="비밀번호 재입력" />
                    <p style={{ color: 'red' }}>{psMessage}</p>
                    <input type="text" onChange={(e) => setMember({ ...member, name: e.target.value })} placeholder="이름" />

                    <input type="text" onChange={checkTell} placeholder="전화번호 입력('-'를 제외한 11자리)" />
                    <p style={{ color: 'red' }}>{tellMessage}</p>
                    <div className='email-box'>
                        <input type="text" placeholder="이메일 주소 입력" onChange={(e) => setMember({ ...member, email: e.target.value })} />
                        <p>@</p>
                        <input type="text" disabled={subEmail == 'defalut' ? false : true} ref={subEmailEl} onChange={(e)=>setMember({...member,email:e.target.value})}/>
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