import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocation, useParams } from 'react-router-dom'
import Sections from '../components/Sections/Sections';
import Accordion from '../components/Accordion/Accordion';
import axios from 'axios';
import CardItem from './../components/CardItem/CardItem';
import AccordionPrice from '../components/AccordionPrice/AccordionPrice';
import Spinner from '../components/Spinner/Spinner'

function SearchResult({ services }) {
  console.log('services', services)
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query');
  const [search, setSearch] = useState();
  const [searchValue, setSearchValue] = useState();
  const [allService, setAllService] = useState()
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)

  const [Id, setId] = useState()
  const getData = async () => {
    try {
      const { data } = await axios.get('http://localhost:3001/api/v1/servicesByUser/AllModel');
      setAllService(data);
      // setAllService(data)
      setSearchValue(data)
      // getId()
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    console.log(search)
    searchService();
  };

  const getUserData = async () => {
    const { data } = await axios.get('http://localhost:3001/api/v1/auth/all');
    setUser(data.findAll);
    console.log('user', user);
  }
  const getUserName = (id) => {
    const foundUser = user.find((item) => item._id === id);
    if (foundUser) {
      return foundUser.userName;
    } else {
      return null;
    }
  };

  const searchService = () => {
    console.log(allService)
    console.log(query)
    const filtered = allService.filter(service => {
      return service.servicingUser.some(item => {
        if (item.user[0].servicesName.toLowerCase().includes(query.toLowerCase())) {
          console.log(service)
          return service;
        }
      });
    })
    console.log('f', filtered)
    setSearchValue(filtered)
    console.log('search value', searchValue)
  }

  const getId = (modeId) => {
    if (modeId) {
      console.log('allllllll', allService);
      const filtered = allService.find((item) => {
        return item.modeId === modeId;
      });
      if (filtered) {
        console.log('filter', filtered);
        console.log('getinf success');
        return filtered._id; // Return the ID if found
      } else {
        console.log('not inf');
        return null; // Return null if not found
      }
    } else {
      console.log('modeId is undefined');
      return null; // Return null if modeId is undefined
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 5000)
    getUserData();
    getData(); // Fetch data when component mounts
    // getId()
  }, []); // Empty dependency array means it only runs once on mount

  useEffect(() => {
    getUserData();
  }, [searchValue, allService]);

  useEffect(() => {
    if (allService) {
      searchService();
    }
  }, [allService]);
  return (
    //   loading ? 
    //   (
    //     <>
    //         <Spinner />
    //     </>
    // ) : (<>
    <div className='subcategory' style={{ background: '#F1F1F1' }}>
      <div className="containerr">
        <div style={{ color: '#444' }} className='title '>
          <p className='top'>
            <Link to='/'><span>الرئيسية</span></Link>
          </p>
          {/* <h1>استشارات الأعمال</h1> */}
          <p style={{ color: '#444', margin: '21px 0' }}> احصل على استشارات احترافية تلبي متطلبات أعمالك</p>
        </div>
        <div className="row">
          <div className='col-md-3 col-lg-3'>
            <Sections handleSearchChange={handleSearchChange} />
            <Accordion services={services} />
            {/* <div className="accordion" id="accordionExample2" style={{ marginBottom: '15px' }}>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button" type="button" style={{ display: 'flex', justifyContent: 'space-between' }} data-bs-toggle="collapse" data-bs-target="#collapse2" aria-expanded="true" aria-controls="collapse2">
                    سعر الخدمة
                  </button>
                </h2>
                <div id="collapse2" className="accordion-collapse collapse show" data-bs-parent="#accordionExample2">
                  <div className="accordion-body p-0">
                    <form action="">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item  py-3"><input type="radio" name="price" id="" value='10' style={{ marginLeft: '10px' }} onChange={handlePriceChange} />
                          <label htmlFor=""> اقل من اسبوع </label></li>
                        <li className="list-group-item  py-3"><input type="radio" name="price" id="" value='20' style={{ marginLeft: '10px' }} onChange={handlePriceChange} />
                          <label htmlFor=""> من 1 الى 2 اسابيع</label></li>
                        <li className="list-group-item  py-3"> <input type="radio" name="price" id="" value='30' style={{ marginLeft: '10px' }} onChange={handlePriceChange} />
                          <label htmlFor=""> من 2 الى 3 اسابيع</label></li>
                      </ul>
                    </form>
                  </div>
                </div>
              </div>

            </div> */}
            <AccordionPrice setSearchValue={setSearchValue} services={allService} />
          </div>
          <div className='col-md-9 py-3'>
    {searchValue && searchValue.length > 0 ? (
        <div className='items'>
            {searchValue.map((item, index) => {
                return item.servicingUser.map((i, innerIndex) => {
                    const Id = getId(item.modeId);
                    return (
                        <CardItem key={innerIndex} item={i} id={i._id} modelId={Id} getUserName={getUserName} />
                    );
                });
            })}
        </div>
    ) : (
        loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' ,margin:0}}>
                <Spinner />
            </div>
        ) : (
            <p>لا يوجد نتائج</p>
        )
    )}
</div>

        </div>
      </div>
    </div>
    //  </> )

  )
}

export default SearchResult