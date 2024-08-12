import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar/Sidebar';
import profile from '../../assets/profile.png';
import joi from 'joi';
import { useNavigate } from 'react-router-dom';

function AddService() {

  const [Services, setServices] = useState({})
  const [ErrorList, setErrorList] = useState('')
  const [backendError, setBackendError] = useState('')
  const token = `rand__${localStorage.getItem('token')}`
  console.log(token)
  let navigate = useNavigate();
  const validation = () => {
    const schema = joi.object({
      name: joi.string().required().messages({
        'any.required': 'Service name is required'
      }),
      image: joi.object().required().messages({
        'any.required': 'Service image is required'
      }),
    });
    return schema.validate(Services, { abortEarly: false });
  };
  const goToServiceList = () => {
    let path = '/service';
    navigate(path)
  }

  let getFormValue = (e) => {
    const newServices = { ...Services };
    if (e.target.name === 'image') {
      newServices.image = e.target.files[0];
    } else {
      newServices[e.target.name] = e.target.value;
    }
    setServices(newServices);
    setErrorList('');
  }

  let submitForm = async (e) => {
    e.preventDefault();
    let validateForm = validation();
    if (validateForm.error) {
      setErrorList(validateForm.error.details);
    } else {
      const formData = new FormData();
      formData.append('name', Services.name);
      formData.append('image', Services.image);
      let headers = {
        token
      }
      try {
        let { data } = await axios.post('http://localhost:3001/api/v1/services/add', formData, { headers });
        console.log({ data });
        goToServiceList()
      } catch (error) {
        setBackendError(error.message);
      }
    }
  }

  useEffect(() => {
  }, [open])

  return (
    <div className='addService'>
        
        <div className="home-content container" style={{ marginLeft: '100px' }}>
          <div>
            <h2>Update Service</h2>
            <form onSubmit={submitForm}>
              <div className="name" style={{ marginTop: '20px' }}>
                <label htmlFor="name" style={{ fontSize: '17px' }}> Service name <span style={{ color: 'red' }}>*</span></label>
                <br />
                <input type='text' name="name" id="name" placeholder='name' onChange={getFormValue} />
              </div>
              <div className="image" style={{ marginTop: '20px' }}>
                <label htmlFor="image" style={{ fontSize: '17px' }}> service image<span style={{ color: 'red' }}>*</span></label>
                <br />
                <input type='file' name="image" id="image" placeholder='image' onChange={getFormValue} />
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

              <button type="submit" className='submin'>Submit</button>
            </form>
          </div>
        </div>
        <div>
        </div>
    </div>
  );
}

export default AddService;
