import React, { useContext, useEffect, useState } from 'react'
import { useParams,Link } from 'react-router-dom';
import { AnimalContext } from '../Context';

const AnimalInfo = () => {
    const { id } = useParams();
    const { animal } = useContext(AnimalContext);
    const [info, setInfo] = useState();
    const [imgInfo, setImgInfo] = useState([]);
    var [imgN, setN] = useState(0);
    var IMG = [];
    var value;
    var content;
    var imgChange;
    
    //console.log(a.replace(/[^\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/gi,"").replace("함초롬바탕"));  //한글만 뽑아냄

    //동물api에서 정보에 활용한 데이터 정리
    animal && animal.map((obj, key) => {
        if (obj.Animal.ANIMAL_NO == id) {
            if (obj.img.PHOTO_KND == 'IMG') {
                IMG.push({ PHOTO_URL: obj.img.PHOTO_URL, PHOTO_KND: obj.img.PHOTO_KND, PHOTO_NO: obj.img.PHOTO_NO });
            }
            value = obj.Animal
            content = obj.Animal.INTRCN_CN
            content = content.replace(/style=(\"|\')?([^\"\']+)(\"|\')?/g, '')
            content = content.replace(/id=(\"|\')?([^\"\']+)(\"|\')?/g, '')
            content = content.replace(/class=(\"|\')?([^\"\']+)(\"|\')?/g, '')
            content = content.replace(/data-input-buffer=(\"|\')?([^\"\']+)(\"|\')?/g, '')

        }
    })
    useEffect(() => {
        setInfo(value)
        setImgInfo(IMG)
        
    }, [])
   
     if(info &&info.SPCS == 'DOG'){
        console.log(imgChange);
    }
    const changImg = (number) => {
        setN(number)
    }

    return (
        <>{
            info &&
            <section className='info-container'>
                <p>분양동물 상세정보</p>
                <div className='info-content'>
                    <div className='img-box'>
                        <img src={imgInfo[imgN].PHOTO_URL} alt='입양동물 사진'></img>
                    </div>
                    <div className='text-box'>
                        <ul>
                            <li><p>이름 : {info.NM}</p></li>
                            <li><p>품종 : {info.BREEDS}</p></li>
                            <li><p>성별 : {info.SEXDSTN}</p></li>
                            <li><p>나이 : {info.AGE}</p></li>
                            <li><p>체중 : {info.BDWGH}Kg</p></li>
                            <li><p>입소날짜 : {info.ENTRNC_DATE}</p></li>
                            <li><p>센터 : {info.CENTER}</p></li>
                            <li><p>임시보호 가능 여부 : {info.IMBO}</p></li>
                            <li><div className='img-list'>
                                {
                                    imgInfo && imgInfo.map((obj, key) => {
                                        return <p key={obj.PHOTO_NO} onClick={() => changImg(key)}><img src={obj.PHOTO_URL}></img></p>
                                    })
                                }
                            </div></li>
                        </ul>
                    </div>

                </div>
                <div className='youtube-content'>
                    <p>매력발산</p>
                    <div className='youtube-video-box'>
                        {
                            info.INTRCN_MVP_URL != '' ? <iframe
                                src={`https://www.youtube.com/embed/${info.INTRCN_MVP_URL}?mute=1`}
                                title="YouTube video player" frameborder="0"
                                allow="" >
                            </iframe> : <p>영상이 없습니다.</p>

                        }
                        <div className='youtube-text' dangerouslySetInnerHTML={{ __html: content }} />
                    </div>

                </div>
                {
                    <Link to="/AnimalHomes"><button style={{backgroundImage :`url(${process.env.PUBLIC_URL + info.SPCS == 'DOG' ? "../img/bone.svg" :"../img/fishbone.svg" })`}}>목록</button></Link>
                }
                
               
                
            </section >
        }
            
        </>
    )
}

export default AnimalInfo