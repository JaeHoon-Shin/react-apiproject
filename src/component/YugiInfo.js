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


  return (
    yugiInfo && <>

      <section className='yugi-info-container'>
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
              <li>품종 : {yugiInfo.BREEDS}</li>
              <li>성별 : {yugiInfo.sexCd}</li>
              <li>나이 : {yugiInfo.age}</li>
              <li>몸무게 : {yugiInfo.weight}</li>
              <li>발견장소 : {yugiInfo.happenPlace}</li>
              <li>특징 : {yugiInfo.specialMark}</li>


            </ul>
          </div>

        </div>

        <div className='question-box'>
          <p> 유기동물 문의는 아래 보호센터에 연락하시기 바랍니다.</p>
          <table>
            <colgroup>
 
            </colgroup>
            <tbody>
              <tr>
                <th>보호센터</th>
                <td>{yugiInfo.careNm}</td>
                <th>전화번호</th>
                <td>{yugiInfo.careTel}</td>
              </tr>
              <tr>
                <th>보호장소</th>
                <td colspan="3">{yugiInfo.careAddr}</td>
              </tr>
              <tr>
                <th>관할기관</th>
                <td colspan="3">{yugiInfo.orgNm}</td>
              </tr>
              <tr>
                <th>담당자</th>
                <td>{yugiInfo.chargeNm}</td>
                <th>연락처</th>
                <td>{yugiInfo.officetel}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  )


}

export default YugiInfo