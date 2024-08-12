import React, { useEffect, useState } from 'react';
import axios from 'axios';
import joi from 'joi';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function AddSubService() {

    const { id } = useParams();
    const [Services, setServices] = useState({})
    const [ErrorList, setErrorList] = useState('')
    const [backendError, setBackendError] = useState('')
    const token = `rand__${localStorage.getItem('token')}`
    let navigate = useNavigate();
    const validation = () => {
        const schema = joi.object({
            name: joi.string().required().messages({
                'any.required': 'Service name is required'
            }),

        });
        return schema.validate(Services, { abortEarly: false });
    };
    const goToServiceList = () => {
        let path = `/show/${id}`;
        navigate(path)
    }

    let getFormValue = (e) => {
        const newServices = { ...Services };

        newServices[e.target.name] = e.target.value;

        setServices(newServices);
        setErrorList('');
    }

    let submitForm = async (e) => {
        e.preventDefault();
        let validateForm = validation();
        if (validateForm.error) {
            setErrorList(validateForm.error.details);
        } else {

            let headers = {
                token
            }
            try {
                let { data } = await axios.post(`http://localhost:3001/api/v1/services/addModelToServices/${id}`, Services, { headers });
                console.log(data);
                goToServiceList();
            } catch (error) {
                setBackendError(error.message);
            }
        }
    }

    useEffect(() => {
    }, [open])

    return (
        // <div style={{ direction: 'ltr', display: 'flex' }} className='addServices'>
        //     <Sidebar open={open} />
        //     <section className="home-section">
        //         <nav>
        //             <div className="sidebar-button">
        //                 <i className="fa-solid fa-bars sidebarBtn" onClick={() => setOpen(prev => !prev)}></i>
        //                 <span className="dashboard">Dashboard</span>
        //             </div>
        //             <div className="search-box">
        //                 <input type="text" placeholder="Search..." />
        //                 <i className="fa-solid fa-magnifying-glass bx-search" />
        //             </div>
        //             <div className="profile-details">
        //                 <img src={profile} alt />
        //                 <span className="admin_name">Prem Shahi</span>
        //                 <i className="bx bx-chevron-down" />
        //             </div>
        //         </nav>
        //         <div className="home-content container" style={{ marginLeft: '100px' }}>
        //             <div>
        //                 <h2>Update Sub Service</h2>
        //                 <form onSubmit={submitForm}>
        //                     <div className="name" style={{ marginTop: '20px' }}>
        //                         <label htmlFor="name" style={{ fontSize: '17px' }}>Sub Service name <span style={{ color: 'red' }}>*</span></label>
        //                         <br />
        //                         <input type='text' name="name" id="name" placeholder='name' onChange={getFormValue} />
        //                     </div>

        //                     <div className='' style={{ direction: 'ltr', width: '374px' }}>
        //                         {ErrorList ? (
        //                             <div className="alert alert-danger m-auto" style={{ 'width': '100%', 'borderRadius': '10px' }}>{ErrorList[0].message}</div>
        //                         ) : (
        //                             backendError ? (
        //                                 <div className="alert alert-danger m-auto" style={{ 'width': '100%', 'borderRadius': '20px' }}>{backendError}</div>
        //                             ) : ''
        //                         )}
        //                     </div>

        //                     <button type="submit" className='btn submin'>Submit</button>
        //                 </form>
        //             </div>
        //         </div>
        //         <div>
        //         </div>
        //     </section>
        // </div>


        <div className='addService'>

            <div className="home-content container" style={{ marginLeft: '100px' }}>
                <div>
                    <h2>Update Sub Service</h2>
                    <form onSubmit={submitForm}>
                        <div className="name" style={{ marginTop: '20px' }}>
                            <label htmlFor="name" style={{ fontSize: '17px' }}>Sub Service name <span style={{ color: 'red' }}>*</span></label>
                            <br />
                            <input type='text' name="name" id="name" placeholder='name' onChange={getFormValue} />
                        </div>

                        <div className='' style={{ direction: 'ltr', width: '374px' }}>
                            {ErrorList ? (
                                <div className="alert alert-danger m-auto" style={{ 'width': '100%', 'borderRadius': '10px' }}>{ErrorList[0].message}</div>
                            ) : (
                                backendError ? (
                                    <div className="alert alert-danger m-auto" style={{ 'width': '100%', 'borderRadius': '20px' }}>{backendError}</div>
                                ) : ''
                            )}
                        </div>

                        <button type="submit" className='btn submin'>Submit</button>
                    </form>
                </div>
            </div>
            <div>
            </div>
        </div>
    )
}

export default AddSubService