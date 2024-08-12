import React from 'react'
import './RegisterNow.css'
import regis from '../../assets/register.png'
import { Link } from 'react-router-dom'
function RegisterNow() {
    return (
        <div className='Registernow'>
            <div className="containerr">
                <div className="row">

                    <div className="col-12 col-md-6">
                        <div className="image">
                            {/* <img src="https://kafiil.com/modules/base/img/register-now.svg" alt="" width={'100%'} /> */}
                            <img src={regis} alt="" width={'80%'} />

                        </div>
                    </div>
                    <div className="col-12 col-md-5 text">
                        <h2>سجل معنا</h2>
                        <p>إستمتع بالمجالات المختلفة التى تقدم لك كافة إحتياجاتك لنمو مشاريعك واعثر على خدمات العمل المستقل المثالية لعملك</p>
                        <Link to='/register' className='btn-reg'>سجل معنا</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterNow