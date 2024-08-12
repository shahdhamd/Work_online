import React from 'react'
import './Numbers.css'
function Numbers() {
    let token=localStorage.getItem('token')
    return (
        <div className='number' style={{ background:token? 'white':'#eceff1' }}>
            <div className="containerr">
                <div style={{ display: 'grid', gridTemplateColumns: ' repeat(auto-fill, minmax(240px, 1fr))', gap: '45px', fontSize: '13px' }}>
                <div style={{ display: 'flex', background:token? '#eceff1':'white', justifyContent: 'space-around', alignItems: 'center',padding:'10px 0' }} >
                    <i className="fa-solid fa-user-plus icon"></i>
                    <div>
                        <p>باحث عن عمل</p>
                        <span>500.000</span>
                    </div>

                </div>
                <div style={{ display: 'flex', background:token? '#eceff1':'white',  justifyContent: 'space-around', alignItems: 'center',padding:'10px 0' }} >
                    <i className="fa-solid fa-users icon"></i>
                    <div>
                        <p>المستخدمين</p>
                        <span>900.000</span>
                    </div>

                </div>
                <div style={{ display: 'flex', background:token? '#eceff1':'white', justifyContent: 'space-around', alignItems: 'center',padding:'10px 0' }} >
                    <i className="fa-solid fa-users icon"></i>
                    <div>
                        <p>المبيعات</p>
                        <span>1.000.000</span>
                    </div>

                </div>
                <div style={{ display: 'flex', background:token? '#eceff1':'white',  justifyContent: 'space-around', alignItems: 'center',padding:'10px 0' }} >
                <i className="fa-solid fa-server icon"></i>
                                    <div>
                        <p>عدد الخدمات</p>
                        <span>850</span>
                    </div>

                </div>
            </div>
            </div>
            
        </div>
    )
}

export default Numbers