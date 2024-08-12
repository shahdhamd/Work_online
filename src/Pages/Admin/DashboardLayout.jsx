import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import profile from '../../assets/profile.png';
import Sidebar from '../../components/Sidebar/Sidebar';
function DashboardLayout({logout,loginData}) {


    const [open, setOpen] = useState(true)

    return (
        <>
            <div style={{ direction: 'ltr', display: 'flex' }}>
                <Sidebar open={open} logout={logout}/>
                <section className="home-section">
                    <nav>
                        <div className="sidebar-button">
                            <i className="fa-solid fa-bars sidebarBtn" onClick={() => setOpen(prev => !prev)}></i>
                            <span className="dashboard">Dashboard</span>
                        </div>
                        <div className="search-box">
                            <input type="text" placeholder="Search..." />
                            <i className="fa-solid fa-magnifying-glass bx-search" />
                        </div>
                        <div className="profile-details">
                            <img src={profile} alt />
                            <span className="admin_name">{loginData.userName}</span>
                            <i className="bx bx-chevron-down" />
                        </div>
                    </nav>

                    <Outlet />

                    <div>

                    </div>
                </section>
            </div>

        </>

    )
}

export default DashboardLayout