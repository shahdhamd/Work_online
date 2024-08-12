import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddReport() {
    const [AddReports, setAddReports] = useState({
        description: ''
    });
    const navigate = useNavigate();

    const getFormValue = (e) => {
        setAddReports(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const token = `rand__${localStorage.getItem('token')}`;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:3001/api/v1/Report/add', AddReports, {
                headers: {
                    token
                }
            });
            console.log("data", data);
            navigate('/profile');
        } catch (error) {
            console.error(`error ${error}`);
        }
    };

    return (
        <div className='addService'>
            <div className="containerr ">
                <div className='card d-flex '>
                    <div style={{ padding: '20px' }}>
                        <div className='card-title'>
                            <p ><i className="fa-solid fa-plus"></i> اضف نبذة   </p>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className=" title" style={{ marginTop: '20px' }}>
                                    <label htmlFor="description" style={{ fontSize: '17px' }}> النبذة <span style={{ color: 'red' }}>*</span></label>
                                    <br />
                                    <textarea type='text' name="description" id="description" rows={10} cols={100} placeholder='اضف نبذة' onChange={getFormValue} />

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

export default AddReport;
