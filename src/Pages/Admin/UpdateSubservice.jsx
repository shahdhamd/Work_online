import React, { useEffect, useState } from 'react';
import axios from 'axios';
import joi from 'joi';
import { useNavigate } from 'react-router-dom';
import { useParams, useLocation } from 'react-router-dom';

function UpdateSubservice() {
    const { modelId, id } = useParams();
    const location = useLocation();
    const rowData = location.state && location.state.rowData ? location.state.rowData : {};
    const [Services, setServices] = useState({})
    const [ErrorList, setErrorList] = useState('')
    const [backendError, setBackendError] = useState('')
    const token = `rand__${localStorage.getItem('token')}`
    let navigate = useNavigate();

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

        let headers = {
            token
        }
        const modeId = id;
        const modelID = modelId
        try {
            let { data } = await axios.patch(`http://localhost:3001/api/v1/services/updateModel/${modeId}/${modelID}`, Services, { headers });
            console.log(data);
            goToServiceList();
        } catch (error) {
            setBackendError(error.message);
        }

    }

    useEffect(() => {
    }, [open])
    return (
        <div className='addService'>

            <div className="home-content container" style={{ marginLeft: '100px' }}>
                <div>
                    <h2>Update Sub Service</h2>
                    <form onSubmit={submitForm}>
                        <div className="name" style={{ marginTop: '20px' }}>
                            <label htmlFor="name" style={{ fontSize: '17px' }}>Sub Service name <span style={{ color: 'red' }}>*</span></label>
                            <br />
                            <input type='text' name="name" id="name" placeholder={rowData.name} onChange={getFormValue} defaultValue={rowData.name} />
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

export default UpdateSubservice