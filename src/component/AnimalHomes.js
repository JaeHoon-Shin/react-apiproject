import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { AnimalContext } from '../Context'

const AnimalHomes = () => {

    const { animal } = useContext(AnimalContext);
    const [change, setChange] = useState("ALL");
    // select-box 변수 저장
    const changeFn = (e) => {
        setChange(e.target.value);
    }

    return (
        <section className='animal-container'>
            <p>분양 동물 게시판</p>
            <div className='animal-content'>
                <p className='select-list'>
                    <select name="species" onChange={changeFn}>
                        <option value="ALL">종 선택</option>
                        <option value="ALL">전체</option>
                        <option value="DOG">강아지</option>
                        <option value="CAT">고양이</option>
                    </select>
                </p>
                <div className='animal-list'>

                    {
                        animal && animal.map((obj, key) => {
                            if (obj.img.PHOTO_KND == 'THUMB') {
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

                            }

                        })
                    }</div>
            </div>
        </section>
    )
}

export default AnimalHomes