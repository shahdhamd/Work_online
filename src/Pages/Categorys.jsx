import React, { useEffect, useState } from 'react'
import Headerr from '../components/Headerr/Headerr'
import Catego from '../components/Catego/Catego'
import { Link, useSearchParams } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Style.css'
function Category() {
    const { id } = useParams();
    let token = `rand__${localStorage.getItem('token')}`
    const [Category, setCategory] = useState();
    const [name, setName] = useState('');

    console.log(id);
    const getData = async () => {
        let { data } = await axios.get(`http://localhost:3001/api/v1/services/allModel/${id}`, {
            headers: {
                token: token
            }
        });
        setName(data.findServices.name);
        console.log('name', name)
        console.log('data', data)
        setCategory(data.findServices.modeling);
    }

    useEffect(() => {
        getData()
    }, [id])
    return (
        <>
            <div className='catego' style={{ background: '#F1F1F1' }}>
                <div className="container">
                    <div>
                        <h1>الخدمات التي نقدمها في {name}  </h1>
                        <div style={{ color: '#444' }} className='title '>
                            <p className='top' style={{ color: '#77869b' }} > <Link to='/'><span>الرئيسية</span></Link>  / <Link to={`/category/${id}`}><span>{name}</span></Link> </p>
                        </div>
                        <div className="items">
                            {Category &&
                                Category.map((c) => {
                                    const modelId = c[0]._id;
                                    return (
                                        <div className='item' key={modelId}>
                                            <Link to={`/subcategory/${id}/${modelId}`}>
                                                <img src='https://khamsat.hsoubcdn.com/uploads/assets/e07e68a595bb3921f96bbdbda256b4a2.png' />
                                                {c[0].name}
                                            </Link>
                                        </div>
                                    );
                                })}
                            {/* <div className='item'>
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
                    </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Category