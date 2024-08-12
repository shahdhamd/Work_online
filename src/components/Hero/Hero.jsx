import React, { useState } from 'react'
import './Hero.css'
import hero from '../../assets/hero.png'
import { useNavigate } from 'react-router-dom'

function Hero() {
    let navigate = useNavigate()
    const [HeroSearch, setHeroSearch] = useState()
    const getFormData = (e) => {
        setHeroSearch(e.target.value)
        console.log(HeroSearch)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/search?query=${HeroSearch}`);
    };

    return (
        <div className='hero '>
            < div className="text my-5">
                <div className="row">
                    <div className="col-12 col-lg-7">
                        <h1>اعثر على خدمات العمل  <span style={{ fontStyle: 'italic' }}>المستقل</span> المثالية لعملك</h1>
                        {/* <h3>إنجز أعمالك عبر الإنترنت بسهولة وأمان على يد نخبة من أفضل المستقلين في الوطن العربي بأسعار تبدأ من 5$ فقط</h3> */}
                        <form className='hero-form' onSubmit={handleSubmit} >
                            <input type='text' placeholder='جرب تصميم شعار او ترجمة ...' name='servicesName' onChange={getFormData} />
                            <button className='btn'>بحث</button>
                        </form>
                    </div>
                    <div className="col-12 col-lg-5 text-center">
                        {/* <img src='https://kafiil.com/modules/base/img/freelancer-on-pc.svg' width={'100%'} /> </div> */}
                        <img src={hero} width={'80%'} /> </div>

                </div>
            </div>

        </div>
    )
}

export default Hero