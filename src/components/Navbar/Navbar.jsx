import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom';
import profile from '../../assets/profile.png'
import logo from '../../assets/logooo.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import NavLink from './NavLink';
function Navbar({ loginData, logout, services }) {
    const [search, setSearch] = useState(false);
    const [openNav, setOpeNav] = useState(false);
    const [openMenu, setMenu] = useState(false)
    console.log('navbar ser', services)
    const [HeroSearch, setHeroSearch] = useState()
    const getFormData = (e) => {
        setHeroSearch(e.target.value)
        console.log(HeroSearch)
    }

    useEffect(() => {
        // getData()
    }, [])
    let navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/search?query=${HeroSearch}`);
    };

    return (
        <div className='nav navbar'>
            <div style={{ width: '100%', height: '14px', background: '#445b63' }} className='nav1'>

            </div>
            <nav className="nav2">

                <div className="containerr">
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                        <i className="fa-solid fa-bars menuIcon " onClick={() => setOpeNav(true)}></i>
                        <ul className='nav-links' style={{ margin: 0 }}>

                            {loginData ? <>
                                <li><Link to="/new"><i className="fa-solid fa-plus"></i> اضافة خدمة </Link></li>
                                {/* <li className='categoryy'><a href="#"> <i className="fa-solid fa-folder-open" ></i>  المشتريات</a></li> */}
                                <li onClick={() => setMenu(prev => !prev)} style={{ cursor: 'pointer', color: 'black', position: 'relative' }}><i className="fa-solid fa-layer-group"></i>  التصنيفات

                                    {openMenu && (
                                        <div style={{ position: 'absolute', top: '44px', right: '0', transition: '.3s all',background:'white', width: '600px',borderRadius:'20px' ,boxShadow:'0 6px 12px rgba(0, 0, 0, 0.175)'}}>
                                            <div style={{ width: '1rem', height: '1rem', background: 'white', transform: 'rotate(45deg)', position: 'absolute', top: '-8px', right: '20px' }}></div>
                                            <div className=' p-3 text-start ' style={{ }}>
                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', padding: '15px' }}>

                                                    {services.map((ss) => (
                                                        <div key={ss._id}>
                                                            <div>
                                                                <div>
                                                                    <div style={{ textAlign: 'start' }}>
                                                                        <h1 style={{ fontSize: '14px', fontWeight: '900' }}><Link to={`category/${ss._id}`}>{ss.name}</Link></h1>

                                                                        <div>
                                                                            <ul style={{ padding: 0, listStyle: 'none' }}>
                                                                                {ss.modeling.map((s) => (
                                                                                    <li key={s._id}>
                                                                                        <Link to={`subcategory/${ss._id}/${s[0]._id}`} style={{ color: '#444', fontSize: '13px' }}>{s[0].name}</Link>
                                                                                    </li>))}
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                            </div>
                                        </div>
                                    )}
                                </li>
                            </>
                                :
                                <>

                                    <li onClick={() => setMenu(prev => !prev)} style={{ cursor: 'pointer', color: 'black', position: 'relative' }}> <i className="fa-solid fa-table-cells-large" ></i> التصنيفات
                                        {openMenu && (
                                            <div style={{ position: 'absolute', top: '44px', right: '0', transition: '.3s all',background:'white', width: '600px',borderRadius:'20px' ,boxShadow:'0 6px 12px rgba(0, 0, 0, 0.175)'}}>
                                            <div style={{ width: '1rem', height: '1rem', background: 'white', transform: 'rotate(45deg)', position: 'absolute', top: '-8px', right: '20px' }}></div>
                                            <div className=' p-3 text-start ' style={{ }}>
                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', padding: '15px' }}>

                                                        {services.map((ss) => (
                                                            <div key={ss._id}>
                                                                <div>
                                                                    <div>
                                                                        <div style={{ textAlign: 'start' }}>                                                                <h1 style={{ fontSize: '14px', fontWeight: '900' }}>{ss.name}</h1>

                                                                            <div>
                                                                                <ul style={{ padding: 0, listStyle: 'none' }}>
                                                                                    {ss.modeling.map((s) => (
                                                                                        <li key={s._id}>
                                                                                            <Link to={s.name} style={{ color: '#444', fontSize: '13px' }}>{s[0].name}</Link>
                                                                                        </li>))}
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>

                                                </div>
                                            </div>
                                        )}</li>
                                </>

                            }
                        </ul>
                        {/* Modile screen */}
                        <ul className='modile-nav' style={{ right: openNav ? '0' : '-100%' }}>

                            <i className="fa-solid fa-xmark navCloseBtn" onClick={() => setOpeNav(false)}></i>

                            {/* <li className='py-4 px-2 text-center'>
                                <Link to="/" className="py-7 px-3 inline-block " style={{ color: 'black' }}>
                                    Home
                                </Link>

                            </li>
                            <li className='py-4 px-2  text-center'><Link to="/" className="py-7 px-3 inline-block " style={{ color: 'black' }}>
                                Home
                            </Link></li> */}
                            <NavLink services={services} loginData={loginData} />
                        </ul>
                        <form className={`search-input  ${search ? 'showSeacrh' : ''}`} onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', margin: '10px' }}>
                            <input type='text' width={'100%'} placeholder='ابحث عن ...' onChange={getFormData} />
                            <button type='submit' className='submin' style={{ height: '100%' ,marginRight:'10px'}}>بحث</button>
                        </form>
                        <Link to="/" className="logo" style={{ width: '126px' }}>
                            {/* <img src='https://www.yallaswap.com/image/catalog/a16526347436708.png' width={'100%'} /> */}
                            {/* <img src='https://www.yallaswap.com/catalog/view/theme/default/image/logo2.png' width={'100%'} /> */}
                            {/* <img src='https://kafiil.com/assets/images/logos/main-logo2.svg' width={'100%'} /> */}
                            <img src={logo} width={'100%'} />

                        </Link>

                        <div className="image">
                            <i className="fa-solid fa-magnifying-glass" onClick={() => setSearch(pre => !pre)}></i>

                            {/* <img src='https://res.cloudinary.com/dh2jv4rcf/image/upload/v1705447294/mercy-pharmacy/categories/ngjn8r7kmqncplyvsgcj.jpg' width={'100%'} style={{ width: '36px', height: '36px', borderRadius: '50%' }} /> */}

                            {loginData ? <>
                                {/* <i className="fa-solid fa-envelope "></i> */}
                                <Link to={'/cart'}>  <i className="fa-solid fa-cart-shopping"></i></Link>
                                <div className="dropdown" style={{ width: '35px' }}>
                                    <div className=" dropdown-toggle " data-bs-toggle="dropdown" aria-expanded="false">
                                        <img src={profile} width={'100%'} className='image'/>
                                    </div>
                                    <ul className="dropdown-menu" style={{}}>
                                        <li><Link className="dropdown-item" to="/profile" style={{ textAlign: 'start' }} ><i className="fa-regular fa-address-card"></i>  ملفي الشخصي </Link></li>
                                        <li onClick={() => logout()}><a className="dropdown-item " href="#" style={{ textAlign: 'start' }} ><i className="fa-solid fa-power-off"></i>  تسجيل الخروج </a></li>
                                        {
                                            loginData.role == 'admin' ? <>
                                                <li><Link className="dropdown-item" to="/dashboard" style={{ textAlign: 'start' }} ><i className="fa-solid fa-table-cells-large"></i>   لوحة التحكم </Link></li>

                                            </> :
                                                <>
                                                </>
                                        }
                                    </ul>
                                </div>
                            </>
                                :
                                <>
                                    <ul style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0', gap: '20px' }}>
                                        <li><Link to='/register' ><i className="fa-solid fa-user-plus"></i>سجل</Link></li>
                                        <li><Link to='/login' ><i className="fa-solid fa-arrow-right-to-bracket"></i>  دخول</Link></li>

                                    </ul>
                                </>}

                        </div>
                    </div>


                </div>

            </nav>
        </div>

    )
}

export default Navbar