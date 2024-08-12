import React, { useEffect, useState } from 'react'
import './Services.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
function Services() {
    const [services, setService] = useState('');
    let token = `rand__${localStorage.getItem('token')}`
    const getData = async () => {
        let { data } = await axios.get('http://localhost:3001/api/v1/services/find', {
            headers: {
                token: token
            }
        });
        console.log(data)
        setService(data.findAll);
        console.log(services)
    }

    useEffect(() => {
        getData();
    }, [])
    return (
        <div className='services'>
            <div className='containerr'>
                <h2>الخدمات التي نقدمها </h2>
                <div className='items'>
                    {services &&
                        services.map((service,index) => {
                            return (
                                <div className='item' key={index}>
                                    <div className="image">
                                        <img src={service.image} />
                                        <div className="overlady">
                                            <Link to={`/category/${service._id}`}>{service.name}</Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                    {/* <div className='item'>
                        <img src='https://khamsat.hsoubcdn.com/assets/images/development-bb416454cb6338d96f266211eb8d2e10fc669ddb8470ee95eef00c841df903e8.jpg' />
                        <div className="overlady">
                            <Link >اعمال</Link>
                        </div>
                    </div>
                    <div className='item'>
                        <img src='https://khamsat.hsoubcdn.com/assets/images/social-5598c2401b6ca90eda3df7c69c8c4727dcc937f8cc995096456d8a8773f4d324.jpg' />
                        <div className="overlady">
                            <Link >اعمال</Link>
                        </div>
                    </div>
                    <div className='item'>
                        <img src='https://khamsat.hsoubcdn.com/assets/images/remote-64132428314c98f2e8abe5e4b98b3a03f215fdd04788b533f52171026fb30d70.jpg' />
                        <div className="overlady">
                            <Link >اعمال</Link>
                        </div>

                    </div>
                    <div className='item'>
                        <img src='https://khamsat.hsoubcdn.com/assets/images/development-bb416454cb6338d96f266211eb8d2e10fc669ddb8470ee95eef00c841df903e8.jpg' />
                        <div className="overlady">
                            <Link >اعمال</Link>
                        </div>
                    </div> */}
                </div>
            </div>

            <br />
            <br />
        </div>
    )
}

export default Services