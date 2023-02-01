import React, { useContext, useEffect, useState } from 'react'
import { AnimalContext } from '../Context'
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

const Main = () => {
    const ColorButton = styled(Button)({
        width: '50px',
        height: '20px',

        color: '#ffffff',
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 12,
        padding: '6px 12px',
        border: '1px solid',
        lineHeight: 1.5,
        backgroundColor: '#0063cc',
        borderColor: '#0063cc',
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            backgroundColor: '#0069d9',
            borderColor: '#0062cc',
            boxShadow: 'none',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#0062cc',
            borderColor: '#005cbf',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    });
    const { animal,yugiList } = useContext(AnimalContext);
    const [aniList, setAniList] = useState([]);
    var aniValue = [];
    useEffect(() => {
        animal && animal.map((obj, key) => {
            if (obj.img.PHOTO_KND == 'THUMB') {
                aniValue.push(obj)
                setAniList(aniValue);
            }
        })
    }, [])

    return (
        <>
            <div className='main-container'>
                <figure className="main-view-img"><img src='../img/logo.svg' alt='분양관련 이미지....'></img></figure>

                <section className='todoList-box'>
                    <article className='animal-list'>
                        <div className='list-box'>
                            <div className='header-list'>
                            <Stack direction="row">
                            <p>의뢰인들</p>
                                <ColorButton><Link to="/AnimalHomes">더보기</Link></ColorButton>
                            </Stack></div>
                            <ul>
                                {
                                    aniList && aniList.map((obj, key) => {
                                        if (key < 5) {
                                            return <Link key={key} to={`/animalInfo/${obj.Animal.ANIMAL_NO}`}>
                                                <li>
                                                    <div>
                                                        <img src={obj.img.PHOTO_URL}>
                                                        </img>
                                                        <p>{obj.Animal.NM} / {obj.Animal.BREEDS} / {obj.Animal.SEXDSTN} / {obj.Animal.AGE}</p>
                                                    </div>
                                                </li>
                                            </Link>
                                        }
                                    })
                                }
                            </ul>
                        </div>
                    </article>
                    <article className='yugi-list'>
                        <div className='list-box'>
                        <div className='header-list'>
                            <Stack direction="row">
                            <p>무주택자</p>
                                <ColorButton><Link to="/Yugilist">더보기</Link></ColorButton>
                            </Stack></div>
                            
                            <ul>
                            {
                                    yugiList && yugiList.map((obj, key) => {
                                        if (key < 5) {
                                            return <Link key={key} to={`/yugiInfo/${obj.desertionNo}`}>
                                                <li>
                                                    <div>
                                                        <img src={obj.filename}>
                                                        </img>
                                                        <p>{obj.age} / {obj.kindCd} / {obj.BREEDS}</p>
                                                    </div>
                                                </li>
                                            </Link>
                                        }
                                    })
                                }
                            </ul>
                        </div>
                    </article>
                    <article className='jarang-list'>
                        <div className='list-box'>
                        <div className='header-list'>
                            <Stack direction="row">
                            <p>가족 자랑</p>
                                <ColorButton><Link to="/animal-list">더보기</Link></ColorButton>
                            </Stack></div>
                           
                            <ul>
                                <li>aaa</li>
                                <li>bbb</li>
                                <li>ccc</li>
                                <li>ddd</li>
                            </ul>
                        </div>
                    </article>
                    <article className='qna-list'>
                        <div className='list-box'>
                        <div className='header-list'>
                            <Stack direction="row">
                            <p>QnA</p>
                                <ColorButton><Link to="/qna">더보기</Link></ColorButton>
                            </Stack></div>
                            
                            <ul>
                                <li>aaa</li>
                                <li>bbb</li>
                                <li>ccc</li>
                                <li>ddd</li>
                            </ul>
                        </div>
                    </article>
                </section>

            </div>
        </>

    )
}

export default Main