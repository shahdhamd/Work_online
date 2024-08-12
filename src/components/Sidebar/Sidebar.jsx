import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
function Sidebar({ open, logout }) {
    return (
        <div className={`sidebar ${open ? 'active' : ''}`}>
            <div className="logo-details">
                <div>
                    {/* <img src={logo} style={{ width: '83px' }} /> */}
                </div>
            </div>
            <ul className="nav-links">
                <li>
                    <Link to="/dashboard" className="active">
                        <i className="fa-solid fa-table-cells-large"></i>
                        <span className="links_name">Dashboard</span>
                    </Link>
                </li>
                <li style={{marginTop:"20px"}}>
                    <Link to="/userr">
                        <i className="fa-solid fa-user"></i>
                        <span className="links_name" >Users</span>
                    </Link>
                </li>
                <li>
                    <Link to="/service">
                        <i className="fa-solid fa-layer-group"></i>
                        <span className="links_name">Servies</span>
                    </Link>
                </li>

                <li>
                    <Link to="/contact">
                    <i class="fa-solid fa-bug"></i>
                        <span className="links_name">Irregularities</span>
                    </Link>
                </li>


                <li>
                    <Link to="/">
                        <i class="fa-solid fa-house"></i>
                        <span className="links_name">Home</span>
                    </Link>
                </li>
                <li className="" onClick={logout}>
                    <Link to="/login">
                        <i class="fa-solid fa-arrow-right-from-bracket"></i>
                        <span className="links_name">Log out</span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar