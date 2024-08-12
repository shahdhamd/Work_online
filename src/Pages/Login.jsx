import React, { useEffect, useState } from 'react'
import './Style.css'
import { Link } from 'react-router-dom';
import joi from 'joi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({setUserData}) {
    const [showPassword, setshowPassword] = useState(false)
    let [errorList, setErrorList] = useState('')
    let [backendError, setBackendError] = useState('')
    let [user, setUser] = useState({
        email: '',
        password: ''
    })
    let navigate = useNavigate();

    function validation() {
        const schema = joi.object({
            password: joi.string().required().min(7).messages({
                'string.min': 'يجب ان تتكون كلمة المرور على الاقل من 7 حروف'
            }),
            email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
                'string.email': 'يُرجى إدخال عنوان بريد إلكتروني صحيح'
            }),
        })
        return schema.validate(user);
    }

    let goToHome = () => {
        let path = '/home'
        navigate(path)
    }
    let goTodashboard = () => {
        let path = '/dashboard'
        navigate(path)
    }
    let getFormValue = (e) => {
        let myUser = { ...user };
   
        myUser[e.target.name] = e.target.value;
    
        setUser(myUser)
        console.log(user)
      }

    let submitForm = async (e) => {
        e.preventDefault();

        try {
            console.log('helll')
            let validateForm = validation();

            if (validateForm.error) {
                console.log("Validation error:", validateForm.error.details);
                setErrorList(validateForm.error.details);
            } else {
                console.log("Validation successful");

                let { data } = await axios.post('http://localhost:3001/api/v1/auth/signin', user)
console.log(data.token)

                console.log('data ', data);

                if (data.message === 'sucsses') {
                  
                    let token = data.token;

                    if (user.role == 'admin') {
                       

                        goTodashboard();

                    } else {
                        localStorage.setItem('token', token);
                        console.log(localStorage.getItem('token'));
                        goToHome();
                        setUserData();
                    }
                } else {
                    let error = JSON.stringify(data);
                    console.log('data ', error);
                    setBackendError(error);
                    setErrorList(data.message);
                }
            }

        } catch (error) {
            console.error('Error during API request:', error);
        }
    };


    return (
        <div className='login'>
            <div className="container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
                <div className="row p-4" >
                    <div className="col-12 col-lg-6 p-0 my-5" style={{ overflow: 'hidden' }}>
                        <h1>
                            تسجيل الدخول</h1>
                        <form  onSubmit={submitForm}>
                            <div className="row">

                                <div className=" email" style={{ marginTop: '20px' }}>
                                    <label htmlFor="email" style={{ fontSize: '17px' }}>البريد الالكتروني <span style={{ color: 'red' }}>*</span></label>
                                    <input type='email' name="email" id="email" onChange={getFormValue} />
                                </div>
                                <div className=" password" style={{ position: 'relative', margin: '20px 0 10px 0' }}>
                                    <label htmlFor="password" style={{ fontSize: '17px' }}>كلمة السر <span style={{ color: 'red' }}>*</span></label>
                                    <input type={showPassword ? 'text' : 'password'} name="password" id="password"  onChange={getFormValue}/>
                                    <i id="pass-toggle-btn" className="fa-solid fa-eye" onClick={() => setshowPassword(prev => !prev)} style={{ position: 'absolute', top: '40px', left: '16px', fontSize: 'large', background: 'white' }} ></i>
                                </div>
                                <p style={{ color: '#00860', fontSize: '14px' }}>  ليس لديك حساب؟
                                    <Link to='/register' style={{ color: '#445b63' }}>  انشاء حساب </Link>
                                </p>

                                <p style={{ color: '#445b63', fontSize: 'medium' }}>
                                    <Link to='/reset' style={{ color: 'black', fontSize: '14px' }}> هل نسيت كلمة السر؟</Link>
                                </p>
                                <div className='' style={{ direction: 'rtl' }}>
                                    {errorList ? (
                                        <div className="alert alert-danger m-auto" style={{ 'width': '100%', 'borderRadius': '10px' }}>{errorList[0].message}</div>
                                    ) : (
                                        backendError ? (
                                            <div className="alert alert-danger m-auto" style={{ 'width': '100%', 'borderRadius': '20px' }}>{backendError}</div>
                                        ) : ''
                                    )}
                                </div>
                                <button type='submit' className='btn flex px-0' style={{ background: '#445b63', color: 'white' ,marginTop:'20px'}}>
                                    <span>دخول </span>
                                </button>
                            </div>

                        </form>
                    </div>
                    <div className="col-12 col-lg-6 p-0 d-flex align-items-center justify-content-end">
                        {/* <img src='https://kafiil.com/modules/base/img/static/login.svg' width={'100%'} /> */}
                        <img src='https://yayasanrubic.org/wp-content/uploads/2022/12/form-KAKAK-ASUH-1024x864.png' width={'80%'} />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login