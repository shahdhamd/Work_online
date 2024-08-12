import React from 'react'
import './Catego.css'
import { Link } from 'react-router-dom'
function Catego() {
    return (
        <div className='catego' style={{ background: '#F1F1F1' }}>
            <div className="container">
                <div>
                <h1>الخدمات التي نقدمها في الاعمال  </h1>
                <div style={{ color: '#444' }} className='title '>
                    <p className='top'style={{color:'#77869b'}} > <Link to='/'><span>الرئيسية</span></Link>  / <Link to='/category'><span>اعمال</span></Link> </p>
                    </div>
                <div className="items">
                    <div className='item'>
                        <Link to='/subcategory'>
                            <img src='https://khamsat.hsoubcdn.com/uploads/assets/e07e68a595bb3921f96bbdbda256b4a2.png' />
                            استشارات أعمال
                        </Link>
                    </div>

                    <div className='item'>
                        <Link >
                            <img src='https://khamsat.hsoubcdn.com/uploads/assets/e07e68a595bb3921f96bbdbda256b4a2.png' />
                            استشارات أعمال
                        </Link>
                    </div>

                    <div className='item'>
                        <Link >
                            <img src='https://khamsat.hsoubcdn.com/uploads/assets/e07e68a595bb3921f96bbdbda256b4a2.png' />
                            استشارات أعمال
                        </Link>
                    </div>

                    <div className='item'>
                        <Link >
                            <img src='https://khamsat.hsoubcdn.com/uploads/assets/e07e68a595bb3921f96bbdbda256b4a2.png' />
                            استشارات أعمال
                        </Link>
                    </div>

                    <div className='item'>
                        <Link >
                            <img src='https://khamsat.hsoubcdn.com/uploads/assets/e07e68a595bb3921f96bbdbda256b4a2.png' />
                            استشارات أعمال
                        </Link>
                    </div>
                </div>
            </div>
            </div>


        </div>
    )
}

export default Catego