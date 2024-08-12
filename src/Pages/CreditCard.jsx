import React from 'react';
import './Style.css';

function CreditCard({ loginData }) {
    return (
        <div className='CreditCard'>
            <div className="container d-lg-flex">

                {/* Removed box-inner-1 pb-3 mb-3 div */}
                <div className="box-2">
                    <div className="box-inner-2">
                        <div>
                            <p className="fw-bold">بيانات الدفع</p>
                            <p className="dis mb-3">أكمل عملية الشراء من خلال تقديم تفاصيل الدفع الخاصة بك</p>
                        </div>
                        <form action>
                            <div className="mb-3">
                                <p className="dis fw-bold mb-2">عنوان البريد الالكتروني</p> <input className="form-control" type="email" defaultValue={loginData.email} />
                            </div>
                            <div>
                                <p className="dis fw-bold mb-2">معلومات البطاقة</p>
                                <div className="d-flex align-items-center justify-content-between card-atm border rounded">
                                    <div className="fab fa-cc-visa ps-3" />
                                    <input type="text" className="form-control" placeholder="تفاصيل" />
                                    <div className="d-flex w-50"> <input type="text" className="form-control px-0" placeholder="MM/YY" /> <input type="password" maxLength={3} className="form-control px-0" placeholder="CVV" />
                                    </div>
                                </div>
                                <div className="my-3 cardname"> <p className="dis fw-bold mb-2">إسم صاحب البطاقة</p>
                                    <input className="form-control" type="text" /> </div>
                                <div className="address"> <p className="dis fw-bold mb-3">عنوان وصول الفواتير</p>
                                    <select className="form-select" aria-label="Default select example">
                                        <option selected hidden>United States</option> 
                                        <option value={1}>India</option>
                                        <option value={2}>Australia</option> 
                                        <option value={3}>Canada</option>
                                        <option value={4}>Palestine</option> 

                                    </select>
                                    <div className="d-flex">
                                        <input className="form-control zip" type="text" placeholder="ZIP" />
                                        <input className="form-control state" type="text" placeholder="State" />
                                    </div>
                                    <div class="btn btn-primary mt-2">شراء
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div> </div>
        </div>
    )
}

export default CreditCard