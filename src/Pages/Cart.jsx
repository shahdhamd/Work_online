import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Style.css'
import Swal from 'sweetalert2';
import Spinner from '../components/Spinner/Spinner'
function Cart({ loginData }) {
    const [cartItem, setCartItem] = useState()
    const [total,setTotal]=useState()
    let token = `rand__${localStorage.getItem('token')}`
    // console.log(token)
    let headers = {
        token
    }
    
    const getData = async (id) => {
        console.log(id)
        const { data } = await axios.get(`http://localhost:3001/api/v1/bag/${id}`, { headers });
        console.log(data);
        setCartItem(data)
    }
    const getTotal=async(id)=>{
const {data}=await axios.get(`http://localhost:3001/api/v1/bag/total/${id}`, { headers });
setTotal(data.totalPrice);
    }
    const handleDelete = async (itemId) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    console.log(itemId)
                    const { data } = await axios.delete(`http://localhost:3001/api/v1/bag/delet/${itemId}/${loginData.id}`, { headers });
                    console.log(data);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                    getData();
                } catch (error) {
                    console.error('Error deleting service:', error);
                }
            }
        });
    }
    useEffect(() => {
        getData(loginData.id)
        getTotal(loginData.id)
    }, [cartItem])

    return (
        <>
            {cartItem ? (
                <div style={{ background: 'rgb(241, 241, 241)', minHeight: '80vh' }} className='cart' >
                    <div style={{ padding: '30px 0px', marginTop: '39px' }}>
                        <Link to='/home'><span style={{ color: '#77869b' }}>الرئيسية</span></Link>
                        <h1 style={{ fontSize: '24px' }}>سلة المشتريات</h1>
                    </div>
                    <div className='container'>
                        <div style={{ marginBottom: '20px', background: 'white' }}>
                            <div className="header">
                                <h2 >الخدمة</h2>
                                <h2 >العنوان</h2>
                                <h2 >مرات الطلب</h2>
                                <h2 >التكلفة</h2>
                                <h2>حذف</h2>
                            </div>
                            {cartItem &&
                                cartItem.map((item, index) => {
                                    return (
                                        <div className="row py-3 itemss" style={{ borderBottom: '1px solid #bbbdc1' }} key={index}>
                                            <div className="">
                                                <Link to={`/show/${item.servicesId}/${item.modeId}/${item.itemId}`}>
                                                    {/* <Link to='#'> */}
                                                    <div className="image" >
                                                        <img width={'100%'} src={item.services[0].image} />
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className=" text-center ">
                                                <div className="text">
                                                    <h2>{item.services[0].name}</h2>
                                                    <span><i className="fa-solid fa-user"></i>.Mohamed W </span>
                                                    {/* <ul>
                               <li style={{ display: 'flex', alignItems: 'start' }}>
                                   <input type="checkbox" />
                                   <p>                                    *عمل مرفقات للشركة فى مجال المناقصة، عدد 2 سابقات أعمال كملف pdf
                                   </p>
                               </li>
                               <li style={{ display: 'flex', alignItems: 'start' }}>
                                   <input type="checkbox" />
                                   <p>
                                       عمل العرض الفنى(مقدمة عن الشركة، مجال الأعمال ،صلاحية العرض، الجدول الزمنى)  فى ملف pdf
                                   </p>
                               </li>
                           </ul> */}
                                                </div>
                                            </div>
                                            <div className=" text-center">
                                                {/* <select className='select'>
                           <option value="">1</option>
                           <option value="">2</option>
                           <option value="">3</option>
                           <option value="">4</option>
                           <option value="">5</option>
                           <option value="">6</option>
                           <option value="">7</option>
                           <option value="">8</option>
                           <option value="">9</option>
                           <option value="">10</option>
                       </select> */}
                                                <p>{item.quatity}</p>
                                            </div>
                                            <div className=" text-center">
                                                <h2 style={{ fontSize: '16px' }}>${item.quatity * item.price}</h2>
                                            </div>
                                            <div className=" text-center">
                                                <Link className='Delete' onClick={() => handleDelete(item.itemId)}>
                                                    <i className="fa-solid fa-trash-can DeleteIcon"></i>
                                                </Link>                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="cartFooter">
                            <div className="row">
                                <div className="col-8 u-margin-bottom">
                                    <h4>الإجمالي</h4>
                                </div>
                                <div class="col-4 text-end u-margin-bottom">
                                    <h4>${total}</h4>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-8 u-margin-bottom">
                                    <h4>الرسوم</h4>
                                </div>
                                <div class="col-4 text-end u-margin-bottom">
                                    <h4>$4</h4>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-8 u-margin-bottom">
                                    <h4>المجموع الكلي</h4>
                                </div>
                                <div class="col-4 text-end u-margin-bottom">
                                <h4>${4 + total}</h4>
                                </div>
                            </div>
                        <Link to='/credit' class="shop"><i class="fa-solid fa-cart-shopping"></i>اتمام عملية الشراء</Link>
                        </div>
                    </div>

                </div>
            ) : (
                <><Spinner /></>
            )}
        </>
    );

}

export default Cart