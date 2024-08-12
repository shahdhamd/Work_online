import React, { useState } from 'react'
import './Style.css'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/code.png'
import joi, { func } from 'joi'
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom'
function ChangePassword() {
    // let navigate=useNavigate();
    // function goToHome(){
    //   let path='/forgetpassword';
    //   navigate(path)
    // }
    let [ErrorList, setErrorList] = useState('')
    let navigate = useNavigate();
    const location = useLocation();

    let [UserEmail, setUserEmail] = useState({
        email: location.state?.email || '',
        newPassword: '',
        code: ''
    })
    console.log("email", UserEmail.email);

    function validation() {
        const schema = joi.object({
            // email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            newPassword: joi.string().required().messages({
                'string.min': 'يجب ان يتكون كلمة المرور من 7 حرفًا على الاقل ',
            }),
            email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).messages({
                'string.email': 'يُرجى إدخال عنوان بريد إلكتروني صحيح'
            }),
            code: joi.string().required()
        })
        return schema.validate(UserEmail, { abortEarly: false }); /// بمعنى طبق الفنكشن على المتغير يوزر
    }
    let getFormValue = (e) => {
        let myEmail = { ...UserEmail };
        myEmail[e.target.name] = e.target.value;
        setUserEmail(myEmail);
        console.log(e.target.value)
        setErrorList('')
    }
    function goToLogin(){
        navigate('/login')
      }
    let submitForm = async (e) => {
        e.preventDefault();
        let validateForm = validation();
        if (validateForm.error) {
            console.log("Validation error:", validateForm.error.details);
            setErrorList(validateForm.error.details);
            console.log('error list   ', ErrorList)
            // console.log('error    ',ErrorList[0].message)
        } else {
            console.log("Validation successful");
            console.log('submit code   ', UserEmail.code)
            let {data}=await axios.patch('http://localhost:3001/api/v1/auth/forgetpassword',UserEmail)

            console.log('data', data)
            goToLogin()
        }
    }
    return (
        <div className='login'>
            <div className="container">
                <div className="row p-4" >
                    <div className="col-12 col-lg-6 p-0 my-5" style={{ overflow: 'hidden' }}>
                        <h1>إعادة تعيين كلمة المرور </h1>
                        <form onSubmit={submitForm}>
                            <div className="row">
                                <div className="code" style={{ marginTop: '20px' }}>
                                    <label htmlFor="code" style={{ fontSize: '17px' }}>   رمز اعادة التعيين <span style={{ color: 'red' }}>*</span></label>
                                    <input type='text' name="code" id="code" onChange={getFormValue}/>
                                </div>
                                <div className="newPassword" style={{ marginTop: '20px' }}>
                                    <label htmlFor="newPassword" style={{ fontSize: '17px' }}> كلمة السر الجديدة <span style={{ color: 'red' }}>*</span></label>
                                    <input type='newPassword' name="newPassword" id="newPassword" onChange={getFormValue}/>
                                </div>
                                <button type='submit' className='btn flex px-0 my-4' style={{ background: 'rgb(68, 91, 99)', color: 'white' }}>
                                    <span>اعادة تعيين</span>
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="col-12 col-lg-6 p-0">
                        {/* <img src='https://kafiil.com/modules/base/img/static/forget-pass.svg' width={'100%'} /> */}
                        <img src={logo} width={'100%'} />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword