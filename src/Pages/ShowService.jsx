import React, { useEffect, useState } from 'react'
import './Style.css'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import profile from '../assets/profile.png'
import axios from 'axios'
import Spinner from './../components/Spinner/Spinner';

function ShowService({ services, loginData }) {
  const { serivceId, modelId, id } = useParams();
  console.log('id', id);
  console.log('modeId', modelId)
  console.log('ser', serivceId)
  const [info, setInfo] = useState();
  const [user, setUser] = useState();
  const [comment, setComment] = useState();
  const [comments, setComments] = useState();
  const [all, setAll] = useState(null)
  const [quatity, setQuatity] = useState()
  const [cartItem, setCartItems] = useState([]);
  const [allService, setAllService] = useState()
  const [loading, setLoading] = useState(true)
  const [modeId, setmodeId] = useState()
  // const { increase } = useCartprovider()
  // const quatity = Quatity(id);
  let token = `rand__${localStorage.getItem('token')}`
  // console.log(token)
  let headers = {
    token
  }
  const getServiceName = () => {
    const filtered = services.map((item) => {
      if (item._id === modeId) {
        return item.name;
      }
    })
    return filtered
  }
  const getservice = async () => {
    try {
      const { data } = await axios.get('http://localhost:3001/api/v1/servicesByUser/AllModel');
      setAllService(data);
      console.log(allService)
      // setAllService(data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const getData = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3001/api/v1/servicesByUser/all/${modelId}`);
      // console.log(data)
      if (data) {
        setAll(data);
        setmodeId(data.modeId)
        console.log('hhhhhhhhhh', modeId)
      } else {
        // console.log('errror data')
      }
      console.log(all)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const getQuatity = () => {
    console.log('cart ', cartItem)
    const foundItem = cartItem.find(item => item.itemId === id);
    console.log(foundItem)
    if (foundItem) {
      setQuatity(foundItem);
      console.log(foundItem.quatity)

    }
  };
  const addCart = async (modeId, servicesId, itemId, id) => {
    const { data } = await axios.post(`http://localhost:3001/api/v1/bag/add/${modeId}/${servicesId}/${itemId}/${id}`, null, { headers });
    console.log('addCart', data);
    getCartItem(loginData.id)
  }

  const getInfo = async () => {
    console.log('hhhhhhh', all)
    const filtered = all.servicingUser.find((item) => {
      if (item._id === serivceId) {
        return item.user[0];
      }
    })
    if (filtered) {
      setAll(filtered);
      setInfo(filtered.user[0])
      getUserData(filtered.user[0].createdBy)
      console.log('created', info)
      getComment();
      console.log('getinf sucess')
    } else {
      console.log('not inf')
    }
    // console.log('hello', filtered.user[0])

  }
  const getCartItem = async (madeby) => {
    console.log(id)
    const { data } = await axios.get(`http://localhost:3001/api/v1/bag/all/${madeby}`, { headers });
    console.log(data.findBag);
    setCartItems(data.findBag);
    console.log(cartItem)
  }
  const getComment = async () => {
    const { data } = await axios.get(`http://localhost:3001/api/v1/comment/all/${modelId}/${serivceId}`);
    // console.log(data);
    setComments(data.comments);
    // console.log('com', comments);
  }

  const getAllUser = async () => {
    const { data } = await axios.get('http://localhost:3001/api/v1/auth/all');
    setUser(data.findAll)

  }
  const getUserData = (id) => {
    console.log('userrrrrrr', user)
    const foundUser = user.find(item => item._id === id);
    if (foundUser) {
      return foundUser.userName;
    } else {
      return null;
    }
  };
  const decrease = async (itemId, id) => {
    const { data } = await axios.patch(`http://localhost:3001/api/v1/bag/decrease/${itemId}/${id}`, null, { headers });
    getCartItem(loginData.id)
    console.log('addCart', data);
  }


  useEffect(() => {
    getData();

  }, [])
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 5000)
    getservice()
    getData();
    // getInfo();
    getComment();
    getAllUser();
    getCartItem()
    getQuatity();

  }, []);

  useEffect(() => {
    if (all) {
      console.log('successAll', all.modeId);
      getInfo();
      getComment();
      getQuatity(); // Call getQuatity after cartItem state is updated
    }
  }, [all, cartItem, allService]); // Include cartItem as a dependency

  function formatDate(dateString) {
    const currentDate = new Date();
    const date = new Date(dateString);

    const timeDifference = Math.abs(currentDate - date);
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hoursDifference = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    let formattedDate = '';
    if (daysDifference > 0) {
      formattedDate += `منذ ${daysDifference} يوم`;
      if (hoursDifference > 0) {
        formattedDate += ` و${hoursDifference} ساعة`;
      }
    } else if (hoursDifference > 0) {
      formattedDate += `منذ ${hoursDifference} ساعة`;
    } else {
      formattedDate += 'منذ بضع دقائق';
    }

    return formattedDate;
  }
  const getFormComment = (e) => {
    setComment(e.target.value)
    // console.log(comment)
  }
  const AddComment = async (e) => {
    e.preventDefault();
    const id = modelId;
    const servicesId = serivceId;
    let headers = {
      token
    }
    const { data } = await axios.post(`http://localhost:3001/api/v1/comment/add/${id}/${serivceId}`, { comment }, { headers });
    // console.log(data)
    // console.log(data.message)
    if (data) {
      getComment();
      e.target.reset();
    }
  }


  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {info && user && all ? (
            <div className='showService'>
              <div className="containerr py-5">
                <div style={{ color: '#444' }} className='title '>
                  <h3>{info.servicesName}</h3>
                  <p className='top' > <Link to='/'><span>الرئيسية</span></Link>  /
                    <Link to={`/category/${modeId}`}>
                      <span>{getServiceName()}</span>
                    </Link>
                  </p>
                </div>
                <div className="row">
                  <div className="col-md-12 col-sm-12  col-lg-8">
                    <div className='card'>
                      <div className='image'>
                        <img src={info.image} alt="" width={'100%'} />
                      </div>
                      <div className="body" style={{ padding: '20px', lineHeight: '2rem' }}>
                        {info.servicesDescription.split('\n').map((line, index) => (
                          <p key={index}>{line}</p>
                        ))}
                      </div>
                    </div>
                    <div className="card my-3">
                      <p style={{ borderBottom: '1px solid #dee2e6' }} className='buyService'>شراء الخدمة</p>
                      <div className="service-row">
                        <div className="serivce-count">
                          <span className='plus' onClick={() => addCart(modelId, serivceId, id, loginData.id)}>
                            <i className="fa-solid fa-plus"></i>
                          </span>
                          <input type="number" value={cartItem.length > 0 && quatity ? quatity.quatity : 0} disabled="" min="0" max="10" id="number_of_times_input" className='border-0' />
                          <span className='min' onClick={() => decrease(id, loginData.id)}>
                            <i className="fa-solid fa-minus"></i>
                          </span>
                        </div>
                        <div className="Total-price">
                          المبلغ الكلي <span> ${cartItem.length > 0 && quatity ? quatity.quatity * quatity.price : 0}</span>
                        </div>
                        <button className='shop' onClick={() => addCart(modelId, serivceId, id, loginData.id)}>
                          <i className="fa-solid fa-cart-shopping"></i>
                          شراء
                        </button>
                      </div>
                    </div>
                    <div className="card">
                      <p style={{ borderBottom: '1px solid #dee2e6' }} className='buyService'>التعليقات </p>
                      <div className="body">
                        {
                          comments && comments.length > 0 && comments.map((item, index) => {
                            return (
                              <div className="item " key={index} style={{ padding: '10px 20px', borderBottom: '1px solid #dee0e1' }}>
                                <div className='d-flex'>
                                  <img src={profile} alt="" style={{ borderRadius: '50%', width: '48px', height: '48px ' }} />
                                  <div style={{ marginRight: '8px' }}>
                                    <p style={{ marginBottom: '0' }}>{getUserData(item.madeby)}</p>
                                    <span style={{ fontSize: '12px', color: 'rgb(108, 117, 125)' }}><i class="fa-regular fa-clock"></i> {formatDate(item.DateAddComment)}</span>
                                  </div>
                                </div>
                                <div className="comment" style={{ padding: '10px 20px' }}>
                                  {item.text}
                                </div>
                              </div>
                            )
                          })
                        }

                      </div>
                      <div className="addcomment" style={{ padding: '10px 20px' }}>
                        <form onSubmit={AddComment}>
                          <label htmlFor="comment" style={{ marginBottom: '10px' }}> اضف تعليق</label><br />
                          <input type="text" name="comment" style={{ width: '100%', height: '40px', borderRadius: '20px', padding: '0 10px' }} onChange={getFormComment} />
                          <button type="submit" className='submit my-2'>ارسال</button>
                          <button type="submit" className='submit my-2' style={{ marginRight: "20px" }}>
  <a href={`/addContact/${id}`} style={{ color: "white", textDecoration: "none" }}>اضافة ابلاغ</a>
</button>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className='col-lg-4 col-md-12 col-sm-12' style={{ height: 'fit-content' }}>
                    <div className="card">
                      <div className="header p-3  border-bottom">
                        <i className="fa-solid fa-user"></i>       البائع
                      </div>
                      <div className="person">

                        <img src={profile} alt="" width={'100px'} height={'100px'} style={{ borderRadius: '50%' }} />
                        <p>{getUserData(info.createdBy)}</p>
                        <p> بائع نشيط</p>
                        <div className="rating">
                          <i className="fa-regular fa-star fill"></i>
                          <i className="fa-regular fa-star fill"></i>
                          <i className="fa-regular fa-star fill"></i>
                          <i className="fa-regular fa-star fill"></i>
                          <i className="fa-regular fa-star"></i>
                        </div>
                      </div>
                    </div>
                    <div className="accordion py-3 " id="accordionExample2">
                      <div className="accordion-item">
                        <h2 className="accordion-header">
                          <button className="accordion-button" type="button" style={{ display: 'flex', justifyContent: 'space-between' }} data-bs-toggle="collapse" data-bs-target="#collapse2" aria-expanded="true" aria-controls="collapse2">
                            المعلومات
                          </button>
                        </h2>
                        <div id="collapse2" className="accordion-collapse collapse show" data-bs-parent="#accordionExample2">
                          <div className="accordion-body p-0">
                            <form action="">
                              <ul className="list-group list-group-flush">
                                <li className="list-group-item  py-3 d-flex justify-content-between" style={{ borderTop: '1px solid #dee2e6' }}>
                                  <p className='p-0'><i className="fa-solid fa-dollar-sign" style={{ marginLeft: '10px' }}></i>
                                    السعر
                                  </p>
                                  <span>${info.price}</span>
                                </li>
                                <li className="list-group-item  py-3 d-flex justify-content-between" style={{ borderTop: '1px solid #dee2e6' }}>
                                  <p className='p-0'><i className="fa-solid fa-clock" style={{ marginLeft: '10px' }}></i>
                                    مدة التسليم</p>
                                  <span>{info.time}</span>
                                </li>
                              </ul>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Spinner />
          )}
        </>
      )}
    </>
    // <>
    //   {info && user && all ? (
    //     <div className='showService'>
    //       <div className="containerr py-5">
    //         <div style={{ color: '#444' }} className='title '>
    //           <h3>{info.servicesName}</h3>
    //           <p className='top' > <Link to='/'><span>الرئيسية</span></Link>  /
    //             <Link to={`/category/${all.modeId}`}>
    //               <span>اعمال</span>
    //             </Link>
    //           </p>
    //         </div>
    //         <div className="row">
    //           <div className="col-md-12 col-sm-12  col-lg-8">
    //             <div className='card'>
    //               <div className='image'>
    //                 <img src={info.image} alt="" width={'100%'} />
    //               </div>
    //               <div className="body" style={{ padding: '20px', lineHeight: '2rem' }}>
    //                 {info.servicesDescription.split('\n').map((line, index) => (
    //                   <p key={index}>{line}</p>
    //                 ))}
    //               </div>
    //             </div>
    //             <div className="card my-3">
    //               <p style={{ borderBottom: '1px solid #dee2e6' }} className='buyService'>شراء الخدمة</p>
    //               <div className="service-row">
    //                 <div className="serivce-count">
    //                   <span className='plus' onClick={() => addCart(modelId, serivceId, id)}>
    //                     <i className="fa-solid fa-plus"></i>
    //                   </span>
    //                   <input type="number" value={quatity ? quatity.quatity : 0} disabled="" min="0" max="10" id="number_of_times_input" className='border-0' />
    //                   <span className='min' onClick={() => decrease(id)}>
    //                     <i className="fa-solid fa-minus"></i>
    //                   </span>
    //                 </div>
    //                 <div className="Total-price">
    //                   المبلغ الكلي <span> ${quatity ? quatity.quatity * quatity.price : 0}</span>
    //                 </div>
    //                 <button className='shop' onClick={() => addCart(modelId, serivceId, id)}>
    //                   <i className="fa-solid fa-cart-shopping"></i>
    //                   شراء
    //                 </button>
    //               </div>
    //             </div>
    //             <div className="card">
    //               <p style={{ borderBottom: '1px solid #dee2e6' }} className='buyService'>التعليقات </p>
    //               <div className="body">
    //                 {
    //                   comments && comments.length > 0 && comments.map((item, index) => {
    //                     return (
    //                       <div className="item " key={index} style={{ padding: '10px 20px', borderBottom: '1px solid #dee0e1' }}>
    //                         <div className='d-flex'>
    //                           <img src={profile} alt="" style={{ borderRadius: '50%', width: '48px', height: '48px ' }} />
    //                           <div style={{ marginRight: '8px' }}>
    //                             <p style={{ marginBottom: '0' }}>{getUserData(item.madeby)}</p>
    //                             <span style={{ fontSize: '12px', color: 'rgb(108, 117, 125)' }}><i class="fa-regular fa-clock"></i> {formatDate(item.DateAddComment)}</span>
    //                           </div>
    //                         </div>
    //                         <div className="comment" style={{ padding: '10px 20px' }}>
    //                           {item.text}
    //                         </div>
    //                       </div>
    //                     )
    //                   })
    //                 }

    //               </div>
    //               <div className="addcomment" style={{ padding: '10px 20px' }}>
    //                 <form onSubmit={AddComment}>
    //                   <label htmlFor="comment" style={{ marginBottom: '10px' }}> اضف تعليق</label><br />
    //                   <input type="text" name="comment" style={{ width: '100%', height: '40px', borderRadius: '20px', padding: '0 10px' }} onChange={getFormComment} />
    //                   <button type="submit" className='submit my-2'>ارسال</button>
    //                 </form>
    //               </div>
    //             </div>
    //           </div>
    //           <div className='col-lg-4 col-md-12 col-sm-12' style={{ height: 'fit-content' }}>
    //             <div className="card">
    //               <div className="header p-3  border-bottom">
    //                 <i className="fa-solid fa-user"></i>       البائع
    //               </div>
    //               <div className="person">

    //                 <img src={profile} alt="" width={'100px'} height={'100px'} style={{ borderRadius: '50%' }} />
    //                 <p>{getUserData(info.createdBy)}</p>
    //                 <p> بائع نشيط</p>
    //                 <div className="rating">
    //                   <i className="fa-regular fa-star fill"></i>
    //                   <i className="fa-regular fa-star fill"></i>
    //                   <i className="fa-regular fa-star fill"></i>
    //                   <i className="fa-regular fa-star fill"></i>
    //                   <i className="fa-regular fa-star"></i>
    //                 </div>
    //               </div>
    //             </div>
    //             <div className="accordion py-3 " id="accordionExample2">
    //               <div className="accordion-item">
    //                 <h2 className="accordion-header">
    //                   <button className="accordion-button" type="button" style={{ display: 'flex', justifyContent: 'space-between' }} data-bs-toggle="collapse" data-bs-target="#collapse2" aria-expanded="true" aria-controls="collapse2">
    //                     المعلومات
    //                   </button>
    //                 </h2>
    //                 <div id="collapse2" className="accordion-collapse collapse show" data-bs-parent="#accordionExample2">
    //                   <div className="accordion-body p-0">
    //                     <form action="">
    //                       <ul className="list-group list-group-flush">
    //                         <li className="list-group-item  py-3 d-flex justify-content-between" style={{ borderTop: '1px solid #dee2e6' }}>
    //                           <p className='p-0'><i className="fa-solid fa-dollar-sign" style={{ marginLeft: '10px' }}></i>
    //                             السعر
    //                           </p>
    //                           <span>${info.price}</span>
    //                         </li>
    //                         <li className="list-group-item  py-3 d-flex justify-content-between" style={{ borderTop: '1px solid #dee2e6' }}>
    //                           <p className='p-0'><i className="fa-solid fa-clock" style={{ marginLeft: '10px' }}></i>
    //                             مدة التسليم</p>
    //                           <span>{info.time}</span>
    //                         </li>
    //                       </ul>
    //                     </form>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>


    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   ) : (
    //     <Spinner />
    //   )}
    // </>
  )
}

export default ShowService 