import React, { useEffect, useState } from 'react'
import './Css.css'
import profile from '../../assets/profile.png'
import axios from 'axios'
import Sidebar from '../../components/Sidebar/Sidebar'

function Dashboard() {
    const [Users, setUsers] = useState()
    const getData = async () => {
        const { data } = await axios.get('http://localhost:3001/api/v1/auth/now');
        setUsers(data)
        console.log(data)
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <div >
                
                <div className="home-content">
                    <div className="overview-boxes">
                        <div className="box">
                            <div className="right-side">
                                <div className="box-topic">Total Order</div>
                                <div className="number">40,876</div>
                                {/* <div className="indicator">
              <i className="bx bx-up-arrow-alt" />
              <span className="text">Up from yesterday</span>
            </div> */}
                            </div>
                            {/* <i className="bx bx-cart-alt cart" /> */}
                            <i className="fa-solid fa-cart-shopping cart"></i>
                        </div>
                        <div className="box">
                            <div className="right-side">
                                <div className="box-topic">Total Sales</div>
                                <div className="number">38,876</div>
                                {/* <div className="indicator">
              <i className="bx bx-up-arrow-alt" />
              <span className="text">Up from yesterday</span>
            </div> */}
                            </div>
                            {/* <i className="bx bxs-cart-add cart two" /> */}
                            <i className="fa-solid fa-cart-plus cart "></i>
                        </div>
                        <div className="box">
                            <div className="right-side">
                                <div className="box-topic">Total Profit</div>
                                <div className="number">$12,876</div>
                                {/* <div className="indicator">
              <i className="bx bx-up-arrow-alt" />
              <span className="text">Up from yesterday</span>
            </div> */}
                            </div>
                            <i className="fa-solid fa-money-bill cart "></i>
                        </div>
                        <div className="box">
                            <div className="right-side">
                                <div className="box-topic">Total Return</div>
                                <div className="number">9,086</div>
                                {/* <div className="indicator">
              <i className="bx bx-down-arrow-alt down" />
              <span className="text">Down From Today</span>
            </div> */}
                            </div>
                            <i className="fa-solid fa-user-plus  cart "></i>
                        </div>
                    </div>
                    <div className="sales-boxes">
                        <div className="recent-sales box">
                            <div className="title">Recent Sales</div>
                            <div className="sales-details">
                                <ul className="details">
                                    <li className="topic">Date</li>
                                    {Users &&
                                       Users.map((e,index) => {
                                        return (
                                            <>
                                                <li key={index}><a href="#">{e.lastOpenDate}</a></li>


                                            </>
                                        )
                                    })


                                    }

                                </ul>

                                <ul className="details">
                                    <li className="topic">Name</li>
                                    {Users &&
                                        Users.map((e,index) => {
                                            return (
                                                <>
                                                    <li key={index}><a href="#">{e.userName}</a></li>


                                                </>
                                            )
                                        })


                                    }

                                </ul>
                                <ul className="details">
                                    <li className="topic">Email</li>
                                    {Users &&
                                        Users.map((e,index) => {
                                            return (
                                                <>
                                                    <li key={index}><a href="#">{e.email}</a></li>


                                                </>
                                            )
                                        })


                                    }

                                </ul>
                            </div>
                            <div className="button">
                                <a href="#">See All</a>
                            </div>
                        </div>
                        <div className="top-sales box">
                            <div className="title">Top Seling Product</div>
                            <ul className="top-sales-details">
                                <li>
                                    <a href="#">
                                        <img src="images/sunglasses.jpg" alt />
                                        <span className="product">Vuitton Sunglasses</span>
                                    </a>
                                    <span className="price">$1107</span>
                                </li>
                                <li>
                                    <a href="#">
                                        <img src="images/jeans.jpg" alt />
                                        <span className="product">Hourglass Jeans </span>
                                    </a>
                                    <span className="price">$1567</span>
                                </li>
                                <li>
                                    <a href="#">
                                        <img src="images/nike.jpg" alt />
                                        <span className="product">Nike Sport Shoe</span>
                                    </a>
                                    <span className="price">$1234</span>
                                </li>
                                <li>
                                    <a href="#">
                                        <img src="images/scarves.jpg" alt />
                                        <span className="product">Hermes Silk Scarves.</span>
                                    </a>
                                    <span className="price">$2312</span>
                                </li>
                                <li>
                                    <a href="#">
                                        <img src="images/blueBag.jpg" alt />
                                        <span className="product">Succi Ladies Bag</span>
                                    </a>
                                    <span className="price">$1456</span>
                                </li>
                                <li>
                                    <a href="#">
                                        <img src="images/bag.jpg" alt />
                                        <span className="product">Gucci Womens's Bags</span>
                                    </a>
                                    <span className="price">$2345</span>
                                </li><li>
                                    <a href="#">
                                        <img src="images/addidas.jpg" alt />
                                        <span className="product">Addidas Running Shoe</span>
                                    </a>
                                    <span className="price">$2345</span>
                                </li>
                                <li>
                                    <a href="#">
                                        <img src="images/shirt.jpg" alt />
                                        <span className="product">Bilack Wear's Shirt</span>
                                    </a>
                                    <span className="price">$1245</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div>
                    {/* <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                            }}
                            pageSizeOptions={[5, 10]}
                            checkboxSelection
                        />
                    </div> */}
                    {/* <DataTable/> */}
                </div>
        </div>
    )
}

export default Dashboard