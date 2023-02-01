import React, { createContext, useState, useEffect, useReducer } from 'react'
import axios from 'axios'
export const AnimalContext = createContext(null);





const Context = ({ children }) => {

    const yugiChange = (change) => {  
        switch (change) {
            case 'All':
                fetchYugi('')
                return;
            case 'DOG':
                fetchYugi('417000')
                 return ;
            case 'CAT':
                fetchYugi('422400')
                 return;
            case 'Etc':
                fetchYugi('429900')
                 return ;
            default:
                return;
        }
    }
    /*  
      const [hospital, setHospital1] = useState(null); */

    const [animal, setAnimal] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [yugi, setYugi] = useState([]);
    const [yugiList, setYugiList] = useState([]);
    //console.log(a.replace(/[^\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/gi,"").replace("함초롬바탕"));  //한글만 뽑아냄
    
    const fetchYugi = async (num)=>{
        var one;
        var two;
        const res = await axios.get(`http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?upkind=${num}&upr_cd=6110000&_type=json&numOfRows=1000&state=protect&serviceKey=EwgXlGNUpOn1J689C1BsNhz3aVqnPIww3%2FrCAtdbUp8skBH78DwOERESCf8oKS1IyiAUt%2BwGZe2vQZ6ua2wEJg%3D%3D`)
        const yugi = res.data.response.body.items.item;
        yugi && yugi.map((obj,key)=>{
            one = obj.kindCd.replace(' ', "/");
            two = one.split("/");
            two[0]=two[0].replace(/(\[)|(\])/g,'');
            obj.happenDt = obj.happenDt.substring(0, 4) + "년" + obj.happenDt.substring(4, 6) + "월" + obj.happenDt.substring(6, 8) + "일";
            obj.kindCd = two[0];
            obj.BREEDS = two[1];
            obj.sexCd == 'M' ? obj.sexCd ='남아' : obj.sexCd == 'F' ? obj.sexCd ='여아' : obj.sexCd ='미상'
        })
        if(num==''){
            setYugiList(yugi);
        }
        setYugi(yugi);
    }

    useEffect(()=>{
        fetchYugi('');
    },[])
    
    const fetchUsers = async () => {
        try {
            // 요청이 시작 할 때에는 error를 초기화하고
            setError(null);
            // loading 상태를 true 로 바꿉니다.
            setLoading(true);

            //동물 병원 데이터
            // const hospital1 = await axios.get('http://openapi.seoul.go.kr:8088/674848546c73696e3130375966526375/json/LOCALDATA_020301/1/1000/')
            // const hospital2 = await axios.get('http://openapi.seoul.go.kr:8088/674848546c73696e3130375966526375/json/LOCALDATA_020301/1001/2000/')
            // const hospital3 = await axios.get('http://openapi.seoul.go.kr:8088/674848546c73696e3130375966526375/json/LOCALDATA_020301/2001/3000/')
            // setHospital1(hospital1.data.LOCALDATA_020301.row.filter((obj) => obj.DTLSTATENM == '정상').concat(hospital2.data.LOCALDATA_020301.row.filter((obj) => obj.DTLSTATENM == '정상'), hospital3.data.LOCALDATA_020301.row.filter((obj) => obj.DTLSTATENM == '정상')))

            //입양 대기 동물 데이터 , 입양 대기 동물 이미지 데이터
            const animal1 = await axios.get('http://openapi.seoul.go.kr:8088/674848546c73696e3130375966526375/json/TbAdpWaitAnimalView/1/100/')
            const animalImg1 = await axios.get('http://openapi.seoul.go.kr:8088/674848546c73696e3130375966526375/json/TbAdpWaitAnimalPhotoView/1/1000/')
            //유기동물 정보
            //const yugi1 = await axios.get('http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?upkind=&upr_cd=6110000&_type=json&numOfRows=1000&state=protect&serviceKey=EwgXlGNUpOn1J689C1BsNhz3aVqnPIww3%2FrCAtdbUp8skBH78DwOERESCf8oKS1IyiAUt%2BwGZe2vQZ6ua2wEJg%3D%3D')
            //setYugi(yugi1.data.response.body.items.item);
            
            var value = [];
            var anName;
            var center;
            var imbo = false;
            animal1 && animal1.data.TbAdpWaitAnimalView.row.map((an, akey) => {
                anName = an.NM.slice(0, an.NM.indexOf('('));
                center = an.NM.slice(an.NM.indexOf('(') + 1, an.NM.indexOf(')'));
                center = center.split('-');
                center[1] != null ? imbo = "가능" : imbo = "불가능"
                an.SEXDSTN == "M" ? an.SEXDSTN = '남아' : an.SEXDSTN = '여아';
                center = center[0];
                an.NM = anName;
                an.CENTER = center;
                an.IMBO = imbo;
                an.INTRCN_MVP_URL = an.INTRCN_MVP_URL.slice(an.INTRCN_MVP_URL.lastIndexOf('/') + 1)
                animalImg1 && animalImg1.data.TbAdpWaitAnimalPhotoView.row.map((obj, key) => {
                    if (obj.ANIMAL_NO == an.ANIMAL_NO) {
                        value.push({ Animal: an, img: { PHOTO_KND: obj.PHOTO_KND, PHOTO_URL: `https://${obj.PHOTO_URL}`, PHOTO_NO: obj.PHOTO_NO } })
                    }
                    setAnimal(...animal, value)
                })
            })

        } catch (e) {
            setError(e);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
        
    }, []);




    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    /*    
        if (!hospital) return null; */




    return (
        <AnimalContext.Provider value={{ animal, yugi, yugiChange, yugiList }}>
            {children}
        </AnimalContext.Provider>
    )
}

export default Context
