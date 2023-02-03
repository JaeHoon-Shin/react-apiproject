import './App.scss';
import { useState, useRef, useEffect, useContext } from 'react'
import Context from './Context';
import Main from './component/Main';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AnimalHomes from './component/AnimalHomes';
import AnimalInfo from './component/AnimalInfo';
import Yugilist from './component/Yugilist';
import YugiInfo from './component/YugiInfo';
import SingUp from './component/SingUp';
import Qnalist from './component/Qnalist';
import Modal from "react-modal";
import Login from './component/Login';
import axios from 'axios';

function App() {
  const [sinupOpen, setsinupOpen] = useState(false);
  const [loginOpen, setloginOpen] = useState(false);


 /*   useEffect(()=>{
    axios.get("http://localhost:4000/").then(res=>console.log(res)).catch();
  },[])  */


  function loginOpenFn() {
    setloginOpen(true);
  }
  function singupOpenFn() {
    setsinupOpen(true);

  }
  return (
    <>
      <BrowserRouter>
        <header>
          <div className='header-top'>
            <Link to="/"><img src='../img/logo.svg'></img></Link>
            <h2><Link to="/">구해줘 홈즈</Link></h2>
            <ul className='text-box'>
              <li className='logout-box'><p onClick={loginOpenFn}>로그인</p></li>
              <li className='logout-box'><p onClick={singupOpenFn}>회원가입</p></li>
              <li className='login-box'><Link to="/logOut"><p>로그아웃</p></Link></li>
              <li className='login-box'><Link to="/myPage"><img src='../img/mypage.svg'></img></Link></li>
            </ul>
          </div>
          <div className='header-nav'>
            <ul>
              <li><Link to="/AnimalHomes">분양대기자</Link></li>
              <li><Link to="/Yugilist">무주택자</Link></li>
              <li><Link to="/animal-list">가족 자랑</Link></li>
              <li><Link to="/Qnalist">문의</Link></li>
            </ul>
          </div>
        </header>
        <Login isOpen={loginOpen} setOpen={setloginOpen} setsinupOpen={setsinupOpen} />
        <SingUp isOpen={sinupOpen} setOpen={setsinupOpen} />
        <Context>
          <main>

            <Routes>
              <Route path='/' element={<Main />} />
              <Route path='/AnimalHomes' element={<AnimalHomes />}></Route>
              <Route path='/Yugilist' element={<Yugilist />}></Route>
              {/* <Route path='/SingUp'element={<SingUp/>}></Route> */}
              <Route path='/AnimalInfo/:id' element={<AnimalInfo />}></Route>
              <Route path='/YugiInfo/:id' element={<YugiInfo />}></Route>
              <Route path='/Qnalist' element={<Qnalist />}></Route>

            </Routes>
          </main>
        </Context>

      </BrowserRouter>
      <footer>
        <div className='footer-container'>

          내용 들어갈 자리

        </div>

      </footer>
    </>
  );
}

export default App;
