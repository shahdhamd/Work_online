import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner/Spinner';
function AddUserService({ services }) {

    const [selectedModeling, setSelectedModeling] = useState([]);
    const [modelId, setModelId] = useState()
    const [AddService, setAddService] = useState({
        servicesName: '',
        servicesDescription: '',
        instructions: '',
        price: '',
        time: '',
        image: null
    });

    let navigate = useNavigate();
    const goToHome = () => {
        const path = '/home';
        navigate(path)
    }

    let getFormValue = (e) => {
        let myAddService = { ...AddService };
        if (e.target.name === 'image') {
            myAddService.image = e.target.files[0];
        } else {
            myAddService[e.target.name] = e.target.value;
        }
        setAddService(myAddService)
        console.log(AddService)
    }

    const handleServiceChange = (event) => {
        const selectedId = event.target.value;
        const selectedService = services.find(service => service._id === selectedId);
        setSelectedModeling(selectedService ? selectedService.modeling : []);
        console.log(selectedModeling)
    };

    const handleSubServiceChange = (event) => {
        setModelId(event.target.value)
    };
    let token = `rand__${localStorage.getItem('token')}`
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const serviceId = modelId;
            const formData = new FormData();
            formData.append('servicesName', AddService.servicesName);
            formData.append('servicesDescription', AddService.servicesDescription)
            formData.append('instructions', AddService.instructions)
            formData.append('price', AddService.price)
            formData.append('time', AddService.time)
            formData.append('image', AddService.image)
            console.log('hello')
            const { data } = await axios.post(`http://localhost:3001/api/v1/servicesByUser/addbyuser/${serviceId}`, formData, {
                headers: {
                    token
                }
            });
            console.log('data', data);
            goToHome()
        } catch (error) {
            console.error('Error:', error);
        }
    };
    useEffect(() => {
        console.log(services)
    }, [])
    return (
        <div className='addService'>
            <div className="containerr ">
                <div className='card d-flex '>
                    <div style={{ padding: '20px' }}>
                        <div className='card-title'>
                            <p ><i className="fa-solid fa-plus"></i> اضف خدمة جديدة </p>
                        </div>
                        <div className="card-body">
                            <form action="" onSubmit={handleSubmit}>
                                <div className=" title" style={{ marginTop: '20px' }}>
                                    <label HtmlFor="servicesName" style={{ fontSize: '17px' }}> ماذا سوف تقدم في هذه الخدمة؟ <span style={{ color: 'red' }}>*</span></label>
                                    <br />
                                    <input type='title' name="servicesName" id="servicesName" placeholder='العنوان' onChange={getFormValue} />
                                </div>
                                <div className=" category" style={{ marginTop: '20px' }}>
                                    <label HtmlFor="category" style={{ fontSize: '17px' }}> التصنيف <span style={{ color: 'red' }}>*</span></label>
                                    <br />
                                    <div className="row">
                                        <div className='col-lg-6 col-md-6 col-sm-12'>
                                            <select name="" id="" className='select-categ' onChange={(e) => {
                                                handleServiceChange(e)
                                            }} >
                                                <option value="" >اختر التصنيف</option>
                                                {
                                                    services.map((item, index) => {
                                                        return (
                                                            <option key={index} value={item._id} >{item.name}</option>

                                                        )
                                                    })
                                                }
                                                {/* <option value="2" >برمجة</option>
                                                <option value="3">اعمال</option>
                                                <option value="4">تسويق رقمي</option> */}
                                            </select>

                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                            <select name="" id="" className='select-categ' onChange={(e) => {
                                                handleSubServiceChange(e)
                                            }}>
                                                <option value="" >اختر التصنيف الفرعي</option>
                                                {
                                                    selectedModeling.flat().map((item, index) => {
                                                        return (
                                                            <option key={index} value={item._id} >{item.name}</option>

                                                        )
                                                    })
                                                }                          {/* 
                                                <option value="2" >برمجة</option>
                                                <option value="3">اعمال</option>
                                                <option value="4">تسويق رقمي</option> */}
                                            </select>
                                        </div>
                                    </div>


                                </div>
                                <div className=" servicesDescription" style={{ marginTop: '20px' }}>
                                    <label HtmlFor="servicesDescription" style={{ fontSize: '17px' }}> وصف الخدمة <span style={{ color: 'red' }}>*</span>
                                    </label>
                                    <br />
                                    <textarea name='servicesDescription' rows="15" style={{ width: '100%' }} onChange={getFormValue}></textarea>
                                </div>
                                <div classname="upload-img" style={{ marginTop: '20px' }}>
                                    <form class="file-upload-form">
                                        <label HtmlFor="file" class="file-upload-label">
                                            <div class="file-upload-design">
                                                <svg viewBox="0 0 640 512" height="1em">
                                                    <path
                                                        d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"
                                                    ></path>
                                                </svg>
                                                <p>اضعط</p>
                                            </div>
                                            <input id="file" type="file" name='image' onChange={getFormValue} />
                                        </label>
                                    </form>
                                    <input className="input" name="image" id="file" type="file" />
                                </div>
                                <div className="price" style={{ marginTop: '20px' }}>
                                    <br />
                                    <div className="row">
                                        <div className='col-lg-6 col-md-6 col-sm-12'>
                                            <label HtmlFor="category" style={{ fontSize: '17px' }}>    سعر الخدمة  <span style={{ color: 'red' }}>*</span></label>

                                            <select name="price" id="price" className='select-categ' onChange={getFormValue}>
                                                <option value="" >اختر السعر</option>

                                                <option value="5" >$5.00</option>
                                                <option value="10">$10.00</option>
                                                <option value="20">$20.00 </option>
                                                <option value="30">$30.00 </option>
                                                <option value="40">$40.00 </option>

                                            </select>

                                        </div>

                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                            <label HtmlFor="title" style={{ fontSize: '17px' }}>       مدة التسليم <span style={{ color: 'red' }}>*</span></label>

                                            <select name="time" id="time" className='select-categ' onChange={getFormValue}>
                                                <option value="" >اختر مدة التسليم</option>

                                                <option value="يوم" >يوم</option>
                                                <option value="يومين">يومين</option>
                                                <option value="ثلاثة ايام"> ثلاثة ايام</option>
                                                <option value="اربعة ايام"> اربعة ايام</option>
                                                <option value="خمسة ايام"> خمسة ايام</option>
                                                <option value="ستة ايام"> ستة ايام</option>
                                                <option value="سبعة ايام"> اسبوع</option>
                                                <option value="اسبوعين"> اسبوعين</option>
                                                <option value="ثلاث اسابيع"> ثلاث اسابيع</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ marginTop: '20px' }}>
                                    <label HtmlFor="instructions" style={{ fontSize: '17px' }}>    الكلمة المفتاحية    <span style={{ color: 'red' }}>*</span></label>
                                    <br />
                                    <input type='instructions' name="instructions" id="" placeholder='العنوان' onChange={getFormValue} />
                                </div>
                                <button type='submit' className='btn flex  my-4' style={{ background: 'rgb(68, 91, 99)', color: 'white' }}>
                                    اضافة خدمة
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>)
}

export default AddUserService