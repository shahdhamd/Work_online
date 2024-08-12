import React from 'react'
import './Footer.css'
import logo from '../../assets/logooo.png'
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div className='footer'>
            <div className="containerr" style={{ borderBottom: '1px solid white' }}>
                <a style={{ width: 135 }}>
                    {/* <img src='https://www.yallaswap.com/image/catalog/a16526347436708.png' width={'100%'} /> */}
                    {/* <img src='https://kafiil.com/assets/images/logos/main-logo2.svg' width={'100%'} /> */}
                    <img src={logo} width={'100%'} />

                </a>
                <ul style={{display:'flex',flexDirection:'column',gap:'20px'}}>
                    
                    <li ><Link to="/new"  style={{color:'black'}}><i className="fa-solid fa-plus"></i> اضافة خدمة </Link></li>
                    {/* <li className='categoryy'><a href="#"   style={{color:'black'}}> <i className="fa-solid fa-folder-open" ></i>  المشتريات</a></li> */}
                    <li style={{ cursor: 'pointer' ,color:'black' }}> <i className="fa-solid fa-table-cells-large"></i> التصنيفات </li>

                </ul>
                <div >
                    <p>تابعونا</p>
                    <div className='icons'>
                        <div className='icon' style={{background:'#a0acb1',color:'#0a1114'}}>
                            <a> <i className="fa-regular fa-envelope"></i></a>
                        </div>
                        <div className='icon'  style={{background:'#a0acb1',color:'#0a1114'}}>
                            <a> <i className="fa-brands fa-instagram"></i></a>
                        </div>
                        <div className='icon'  style={{background:'#a0acb1',color:'#0a1114'}}>
                            <a> <i className="fa-brands fa-facebook-f"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            {/* <hr style={{height:'1px',background:'white',width:'95%'}}/> */}

            <div style={{ textAlign: 'center', fontSize: '12px', padding: '3px 0px',background:'#445b63' }}> <p style={{color:'white',margin:'0'}}>created by CSE Students in ptuk</p></div>

        </div>

    )
}

export default Footer