import React from 'react'
import './HowWork.css'
function HowWork() {
  return (
    <div className='work'>
        <h1 className='text-center' style={{paddingBottom:'50px'}}><i className="fa-solid fa-briefcase"></i> كيف يعمل؟ </h1>
        <div className='containerr'>
           
        <div className='item'>
            <img src='https://kafiil.com/modules/base/img/service-icon.svg' className='image'/>
            <span className='number'>1 </span>
            <div className="text">
                <p className="title">تصفح الخدمات</p>
                <p style={{minWidth:'264px'}}>تصفح الخدمات وقارن بينها لتختار الأنسب لك </p>
            </div>
        </div>

        <div className='item'>
             <div className="text">
                <p className="title">تصفح الخدمات</p>
                <p style={{minWidth:'264px'}}>تصفح الخدمات وقارن بينها لتختار الأنسب لك </p>
            </div>
                       <span className='number'>2 </span>

            <img src='https://kafiil.com/modules/base/img/service-icon2.svg' className='image'/>
            
        </div>
        <div className='item'>
            <img src='https://kafiil.com/modules/base/img/service-icon3.svg' className='image'/>
            <span className='number'>3</span>
            <div className="text">
                <p className="title">تصفح الخدمات</p>
                <p style={{minWidth:'264px'}}>تصفح الخدمات وقارن بينها لتختار الأنسب لك </p>
            </div>
        </div>
        </div>
    </div>
  )
}

export default HowWork