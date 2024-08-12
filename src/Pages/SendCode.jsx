import React, { useState } from 'react'
import './Style.css'
import logo from '../assets/code.png'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import joi from 'joi';
import axios from 'axios';
function SendCode() {
    let [UserEmail, setUserEmail] = useState({
        email: ''
    })
    let navigate = useNavigate();
    function goToLogin() {
        let path = '/change';
        navigate(path, { state: { email: UserEmail.email } })
    }


    let [ErrorList,setErrorList]=useState('')
    let getFormValue=(e)=>{
      let myEmail={...UserEmail};
      myEmail[e.target.name]=e.target.value;
      setUserEmail(myEmail);
      console.log(e.target.value)
      setErrorList('')
    }
  
    function validation(){
      const schema=joi.object({  
        email:joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
          'string.email':'يُرجى إدخال عنوان بريد إلكتروني صحيح'
      }), 
      })
      return schema.validate(UserEmail,{abortEarly:false}); 
    }
  
  
    let submitForm=async(e)=>{
      e.preventDefault();
      let validateForm=validation();
      if (validateForm.error) {
        console.log("Validation error:", validateForm.error.details);
        setErrorList(validateForm.error.details);
  
        console.log('error list   ',ErrorList)
        // console.log('error    ',ErrorList[0].message)
      } else {
        console.log("Validation successful");
        console.log('submit ',UserEmail)
        let { data } = await axios.patch('http://localhost:3001/api/v1/auth/sendcode', UserEmail)

        console.log('data',data)
        goToLogin()
      }
    }


    return (
        <div className='login'>
            <div className="container">
                <div className="row p-4" >
                    <div className="col-12 col-lg-6 p-0 my-5" style={{ overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div >
                            <h1>إعادة تعيين كلمة المرور </h1>
                            <form  onSubmit={submitForm}>
                                <div className="row">
                                    <div className=" email" style={{ marginTop: '20px', padding: '0' }}>
                                        <label htmlFor="email" style={{ fontSize: '17px' }}>البريد الالكتروني <span style={{ color: 'red' }}>*</span></label>
                                        <input type='email' name="email" id="email" onChange={getFormValue} />
                                    </div>
                                    <button type='submit' className='btn flex px-0 my-4' style={{ background: '#445b63', color: 'white' }}>
                                        <span>اعادة تعيين </span>
                                    </button>
                                </div>
                            </form>
                        </div>

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

export default SendCode