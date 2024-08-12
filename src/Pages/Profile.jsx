import React, { useEffect, useState } from 'react';
import './Style.css';
import profile from '../assets/profile.png';
import axios from 'axios';
import Swal from 'sweetalert2';

function Profile({ loginData }) {
    const token = `rand__${localStorage.getItem('token')}`;
    const [datalist, setDatalist] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/v1/Report/show', {
                headers: {
                    token
                }
            });
            setDatalist(response.data);
            setLoading(false); // Set loading to false after data is fetched
        } catch (error) {
            console.error(`error fetching data ${error}`);
            setLoading(false); // Also set loading to false in case of error
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handelDelete = async (id) => {
        const result = await Swal.fire({
            title: 'هل أنت متأكد؟',
            text: "لن تتمكن من استرداد هذا العنصر!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'نعم، احذفه!',
            cancelButtonText: 'إلغاء الأمر'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`http://localhost:3001/api/v1/Report/delet/${id}`, {
                    headers: {
                        token
                    }
                });
                fetchData();
                Swal.fire({
                    title: 'تم الحذف!',
                    text: 'تم حذف الملف بنجاح.',
                    icon: 'success'
                });
            } catch (error) {
                console.error('Error deleting signal:', error);
            }
        }
    };

    return (
        <div className='profile'>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="container">
                    <div className="row gap-4">
                        <div className="col-md-3 p-0 ">
                            <div className="card">
                                <div className="title">
                                    <p ><i className="fa-solid fa-user"></i> حسابي</p>
                                    <i className="fa-solid fa-gear"></i>
                                </div>
                                <div className="body">
                                    <img src={profile} alt="" />
                                    <p> {loginData.userName}</p>
                                    <p><i className="fa-solid fa-layer-group"></i>  بائع  </p>
                                    <div className="rating">
                                        <i className="fa-regular fa-star fill"></i>
                                        <i className="fa-regular fa-star fill"></i>
                                        <i className="fa-regular fa-star fill "></i>
                                        <i className="fa-regular fa-star fill"></i>
                                        <i className="fa-regular fa-star fill"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 p-0">
                            <div className='card  p-3 ' style={{ marginBottom: '1.5rem' }}>
                                <h1 style={{ fontSize: '1.5rem' }}>البيانات الشخصية</h1>
                                <img src={profile} alt="" />
                                <form action="">
                                    <div className="row">
                                        <div>
                                            <label htmlFor="">الاسم الاول</label> <br />
                                            <input type="text" name="" id="" value={loginData.userName} disabled />
                                        </div>
    
                                        <div>
                                            <label htmlFor=""> البريد الالكتروني</label> <br />
                                            <input type="email" name="" id="" style={{}} value={loginData.email} disabled />
                                        </div>

                                        <button className='submit my-2' style={{ width: "200px", marginRight:"35%",marginTop:"20px"}}>
    <a style={{ color: "white" }} href='/AddReport'>اضافة نبذة</a>
</button>
                                    </div>
    
                          
                                </form>
                            </div>

                     
                                        <div className="card p-3" style={{ marginTop: "40px" }}>
                                            <div className="card-body">
                                                <h3>النبذة </h3>
                                                {datalist.show.map(item => (
                                                    <div key={item._id} className="mb-3">
                                                        <p>{item.description}</p>
                                                        <button onClick={() => handelDelete(item._id)} className='submit my-2'>حذف النبذة</button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                  












                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile