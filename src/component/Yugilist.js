import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { AnimalContext } from '../Context'

const Yugilist = () => {

    const { yugi, yugiChange } = useContext(AnimalContext);
    const changeFn = (e) => {
        yugiChange(e.target.value)
    }
    return (
        <section className='yugi-container'>
            <p>유기 동물 게시판</p>
            <div className='yugi-content'>
                <p className='select-list'>
                    <select name="species" onChange={changeFn}>
                        <option value="All">종 선택</option>
                        <option value="All">전체</option>
                        <option value="DOG">강아지</option>
                        <option value="CAT">고양이</option>
                        <option value="Etc">기타</option>
                    </select>
                </p>
                <div className='yugi-list'>

                    {
                        yugi && yugi.map((obj, key) => {

                            return <Link key={key} to={`/YugiInfo/${obj.desertionNo}`}>
                                <figure>
                                    <img src={obj.popfile}></img>
                                    <figcaption>{obj.noticeNo}</figcaption>
                                </figure>
                            </Link>


                           /*  if (obj.img.PHOTO_KND == 'THUMB') {
                                if (change != "ALL") { // select-box 를 이용하여 정렬
                                    if (obj.Animal.SPCS == change) {
                                        return <Link key={key} to={`/animalInfo/${obj.Animal.ANIMAL_NO}`}>
                                            <figure  ><img src={obj.img.PHOTO_URL} />
                                                <figcaption>{obj.Animal.NM}</figcaption>
                                            </figure>
                                        </Link>
                                    }
                                }
                                else {
                                    return <Link key={key} to={`/animalInfo/${obj.Animal.ANIMAL_NO}`}>
                                        <figure key={key} ><img src={obj.img.PHOTO_URL} />
                                            <figcaption>{obj.Animal.NM}</figcaption>
                                        </figure>
                                    </Link>
                                }

                            } */

                        })
                    }</div>
            </div>
        </section >
    )
}

export default Yugilist