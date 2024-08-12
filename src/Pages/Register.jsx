import React, { useEffect, useState } from 'react'
import './Style.css'
import logo from '../assets/code.png'
import { Link } from 'react-router-dom'
import axios from 'axios'
import joi from 'joi'
import { useNavigate } from 'react-router-dom';

function Register() {
    const [showPassword, setshowPassword] = useState(false)
    let [user, setUser] = useState({   
        userName: '',
        email: '',
        password: ''
    })
    let [ErrorList, setErrorList] = useState('')
    let [backendError, setBackendError] = useState('')

    let navigate = useNavigate()
    function goToLogin() {
        let path = '/login';
        navigate(path)
    }

    function validation() {
        const schema = joi.object({
            userName: joi.string().required().min(2).max(25).messages({
                'string.min': 'يجب ان يتكون اسم المستخدم  من حرفين على الاقل ',
                'string.max': 'يجب أن يتكون اسم المستخدم من 25 حرفًا على الأكثر'
            }),
            email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
                'string.email': 'يُرجى إدخال عنوان بريد إلكتروني صحيح'
            }),
            password: joi.string().required().min(7).messages({
                'string.min': 'يجب ان يتكون كلمة المرور من 7 حرفًا على الاقل ',
            }),
        })
        return schema.validate(user, { abortEarly: false }); /// بمعنى طبق الفنكشن على المتغير يوزر
    }

    let getFormValue = (e) => {
        let myUser = { ...user };
        myUser[e.target.name] = e.target.value;
        setUser(myUser)
        console.log(user)
    }
    let submitForm = async (e) => {
        e.preventDefault();    //// ضفتها لانه لما بالشكل الطبيعي لما اعمل سب ميت يتم تحميل الصفحة وانا ما بدي يحمل

        let validateForm = validation();
        if (validateForm.error) {
            console.log("Validation error:", validateForm.error.details);
            setErrorList(validateForm.error.details);

            console.log('error list   ', ErrorList)
            // console.log('error    ',ErrorList[0].message)
        } else {
            console.log("Validation successful");
            console.log('submit ', user)
            //   let headers={
            //     token
            //   }
            //   console.log('token ',token)
            let { data } = await axios.post('http://localhost:3001/api/v1/auth/signup', user)
            // let {data}=await axios.post('http://localhost:3100/api/v1/user/',user,{headers})
            console.log(data)
            // console.log({ data })

            if (data.message === 'sucsses') {
                console.log('sucsses')
                goToLogin();
            } else {
                let error = JSON.stringify(data);
                console.log('data ', error)

                setBackendError(error)
            }
        }







    }

    return (
        <div className='register'>
            <div className="container">
                <div className="row p-4" >
                    <div className="col-12 col-lg-6 p-0 my-5" style={{ overflow: 'hidden' }}>
                        <h1>
                            أنشئ حساب جديد </h1>
                        <form onSubmit={submitForm}>
                            <div className="row">
                                <div className='' style={{ marginTop: '20px' }}>
                                    <label htmlFor="userName" style={{ fontSize: '17px' }}>الاسم  <span style={{ color: 'red' }}>*</span></label> <br />
                                    <input type="text" id="userName" name='userName' onChange={getFormValue} />
                                </div>

                                {/* <div className='col-12 col-sm-6' style={{ marginTop: '20px' }}>
                                    <label htmlhtmlFor="" style={{ fontSize: '20px' }}>الاسم الاخير <span style={{ color: 'red' }}>*</span></label> <br />
                                    <input type="text" name="" id="" />
                                </div> */}
                                <div className=" email" style={{ marginTop: '20px' }}>
                                    <label htmlFor="email" style={{ fontSize: '17px' }}>البريد الالكتروني <span style={{ color: 'red' }}>*</span></label>
                                    <input type='email' name="email" id="email" onChange={getFormValue} />
                                </div>
                                <div className=" password" style={{ position: 'relative', margin: '20px 0 10px 0' }}>
                                    <label htmlFor="password" style={{ fontSize: '17px' }}>كلمة السر <span style={{ color: 'red' }}>*</span></label>
                                    <input type={showPassword ? 'text' : 'password'} name="password" id="password" onChange={getFormValue} />
                                    <i id="pass-toggle-btn" className="fa-solid fa-eye" onClick={() => setshowPassword(prev => !prev)} style={{ position: 'absolute', top: '40px', left: '16px', fontSize: 'large', background: 'white' }} ></i>
                                </div>
                                <p style={{ color: '#00860', fontSize: 'medium' }}>  هل لديك حساب مسبقا؟
                                    <Link style={{ color: '#445b63' }} to='/login'> تسجيل الدخول </Link>
                                </p>
                                <div className='mt-3' style={{ direction: 'rtl' }}>
                                    {ErrorList ? (
                                        <div className="alert alert-danger me-auto" style={{ 'borderRadius': '10px' }}>{ErrorList[0].message}</div>
                                    ) : (
                                        backendError ? (
                                            <div className="alert alert-danger me-auto " style={{ 'borderRadius': '20px' }}>{backendError}</div>
                                        ) : ''
                                    )}
                                </div>
                                <button type='submit' className='btn flex px-0' style={{ background: '#445b63', color: 'white' }}>
                                    <span>تسجيل </span>
                                </button>
                            </div>

                        </form>
                    </div>
                    <div className="col-12 col-lg-6 p-0 d-flex align-items-center justify-content-end">
                        <img src='https://yayasanrubic.org/wp-content/uploads/2022/12/form-KAKAK-ASUH-1024x864.png' width={'80%'} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register