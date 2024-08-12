import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import axios from 'axios';

function AddContact() {
    const { id } = useParams(); 
    console.log('serviceId:', id);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        proplem: ''
    });

    const goToHome = () => {
        const path = '/home';
        navigate(path);
    };

    const getFormValue = (e) => {
        let myContact = { ...formData };
        myContact[e.target.name] = e.target.value;
        setFormData(myContact);
   
    };
    console.log("mn",formData)

    let token = `rand__${localStorage.getItem('token')}`;


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
         
            const { data } = await axios.post(`http://localhost:3001/api/v1/contact/add/${id}`, formData, {
                headers: {
                    token
                }
            });
            console.log('data', data);
            goToHome();
        } catch (error) {
            console.error('error :', error);
        }
    };

    return (
        <div className='addService'>
            <div className="containerr ">
                <div className='card d-flex '>
                    <div style={{ padding: '20px' }}>
                        <div className='card-title'>
                            <p ><i className="fa-solid fa-plus"></i> اضف ابلاغ  جديدة </p>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className=" title" style={{ marginTop: '20px' }}>
                                    <label htmlFor="proplem" style={{ fontSize: '17px' }}> الابلاغ <span style={{ color: 'red' }}>*</span></label>
                                    <br />
                                    <input type='text' name="proplem" id="proplem" placeholder='اضف ابلاغ' onChange={getFormValue} />
                                   
                                </div>
                                <button type="submit" className='submit my-2'>ارسال</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddContact;