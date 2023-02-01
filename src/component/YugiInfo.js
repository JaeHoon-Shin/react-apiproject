import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AnimalContext } from '../Context';

function YugiInfo() {
  const { id } = useParams();
  const { yugi } = useContext(AnimalContext);
  const [yugiInfo, setYugiInfo] = useState();
  var value;

  yugi && yugi.map((obj, key) => {
    if (obj.desertionNo == id) {
      value = obj;
    }
  });

  useEffect(() => {
    setYugiInfo(value);
  }, []);


 return(
  yugiInfo&&
  <section className='info-container'>
            <p>유기동물 상세정보</p>
            <div className='info-content'>
                <div className='img-box'>
                    <img src={yugiInfo.popfile} alt='유기동물 사진'></img>

                </div>
                <div className='text-box'>
                    <ul>
                        <li>유기번호 : {yugiInfo.desertionNo}</li>
                        <li>관리번호 : {yugiInfo.noticeNo}</li>
                        <li>입소날짜 : {yugiInfo.happenDt}</li>
                        <li>유기번호 : </li>
                        <li>유기번호 : </li>


                    </ul>
                </div>

            </div>
            </section>
 )


}

export default YugiInfo