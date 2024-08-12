import React, { useEffect, useState } from 'react'
import './Style.css'
import Sections from '../components/Sections/Sections'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Accordion from '../components/Accordion/Accordion'
import CardItem from '../components/CardItem/CardItem'
import AccordionPrice from '../components/AccordionPrice/AccordionPrice'
import Spinner from '../components/Spinner/Spinner'
function Subcategory({ services }) {
    const { id, modelId } = useParams();
    const [search, setSearch] = useState();
    const [searchValue, setSearchValue] = useState([]);
    const [allService, setAllService] = useState()
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)
    const getData = async () => {
        try {
            const id = modelId;
            console.log(id);
            const { data } = await axios.get(`http://localhost:3001/api/v1/servicesByUser/all/${id}`);
            console.log('dataservice ', data)
            setSearchValue(data.servicingUser);
            console.log(searchValue);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const getUserData = async () => {
        const { data } = await axios.get('http://localhost:3001/api/v1/auth/all');
        setUser(data.findAll);
    }
    const getUserName = (id) => {
        const foundUser = user.find((item) => item._id === id);
        if (foundUser) {
            return foundUser.userName;
        } else {
            return null;
        }
    };

    const getAllService = async () => {
        const { data } = await axios.get('http://localhost:3001/api/v1/servicesByUser/all');
        console.log('all', data);
        setAllService(data);
    }
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        console.log(search)
        searchService();
    };
    const searchService = () => {
        setSearchValue(allService.filter((item) =>
            item.user.length > 0 && item.user[0].servicesName.toLowerCase().includes(search.toLowerCase()))
        );
        console.log('search value', searchValue)
    }
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 5000)
    }, [])

    useEffect(() => {
        getUserData()

    }, [allService, searchValue])
    useEffect(() => {
        getData()
        getAllService()
    }, [modelId])
    return (
        // searchValue ? (
        //     <>
        //         <Spinner />
        //     </>
        // ) : (
        <>
            <div className='subcategory' style={{ background: '#F1F1F1' }}>
                <div className="containerr">
                    <div style={{ color: '#444' }} className='title '>
                        <p className='top' style={{ zIndex: '1000' }}>
                            <Link to='/'><span>الرئيسية</span></Link>  /
                            <Link to={`/category/${id}`}><span>{services.find(item => item._id === id)?.name}</span></Link> /
                            <Link to={`/subcategory/${id}/${modelId}`}><span> {services.find(item => item._id === id)?.modeling?.find(mode => mode[0]._id === modelId)?.[0].name}</span></Link>
                        </p>
                        <p style={{ color: '#444', margin: '21px 0' }}> احصل على استشارات احترافية تلبي متطلبات أعمالك</p>
                    </div>
                    <div className="row" style={{ minHeight: '1115px' }}>
                        <div className='col-md-3 '>
                            <Sections handleSearchChange={handleSearchChange} />
                            <Accordion id={id} modelId={modelId} services={services} />
                            <AccordionPrice allService={allService} setSearchValue={setSearchValue} />
                        </div>
                        <div className='items col-md-9 py-3'>
                            {searchValue && searchValue.length > 0 ? (
                                searchValue.map((item, index) => {
                                    return (
                                        <CardItem key={index} item={item} id={item._id} modelId={modelId} getUserName={getUserName} />
                                    )
                                })
                            ) : (
                                loading ? (
                                    <>
                                        <Spinner />
                                    </>
                                ) : (
                                    <p>لا يوجد نتائج</p>
                                )
                            )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
        // ) 
    );


}

export default Subcategory