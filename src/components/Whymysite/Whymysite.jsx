import React from 'react'
import './Whymysite.css'
import { Link } from 'react-router-dom'
import support from '../../assets/support_1429498.png'
import shield from '../../assets/shield_10852448.png'
import cash from '../../assets/cash-back_8770407.png'
import boss from '../../assets/man_12396889.png'
function Whymysite() {
    return (
        <div className='whymysite'>
            <div className='containerr'>
                <h2 style={{textAlign:'center'}}>مزايا موقعنا</h2>
                <div className='items'>
                    <div className='item'>
                        <div className="image">
                            <img src={shield} width={'100%'} />
                            </div> 
                             <div className="">
                                <p>  ضمان 100% لحقوقك</p>
                                <span>                                 سواء كنت بائع أو مشتري, يقدم الموقع ضمان 100% لحقوقك. لاخوف بعد اليوم من تقديم خدمات مجانية أو دفع المال وعدم الحصول على الخدمة المطلوبة.
                                </span>
                          
                        </div>
                    </div>
                    <div className='item'>
                        <div className="image">
                        <img src={support} width={'100%'} />
                            </div> 
                             <div className="p-2">
                             <p>  دعم فني 7/24</p>
                                <span>              نحن هنا لمساعدتك في حل أي مشكلة قد تواجهك وللإجابة عن أي استفسار، بفريق دعم فني متواجد ومتعاون على مدار 24 ساعة وطوال أيام الأسبوع.</span>
                          
                        </div>
                    </div>
                    
                    <div className='item'>
                        <div className="image">
                        <img src={cash} width={'100%'} />
                            </div> 
                             <div className="">
                             <p>  أسعار في متناول اليد</p>
                                <span>                                  سواء كنت بائع أو مشتري, يقدم الموقع ضمان 100% لحقوقك. لاخوف بعد اليوم من تقديم خدمات مجانية أو دفع المال وعدم الحصول على الخدمة المطلوبة.
                               </span>
                          
                        </div>
                    </div>
                    <div className='item'>
                        <div className="image">
                        <img src={boss} width={'100%'} />
                            </div> 
                             <div className="">
                             <p> كن مدير نفسك </p>
                                <span>             عملك ضمن الموقع يعتبر كما لو أنك تمتلك شركتك الخاصة بك. إختر أنت أيام العمل التي تناسبك وضمن الساعات والأوقات التي تلائم ظروفك.

</span>
                          
                        </div>
                    </div>
                    {/*    <div className='item'>
                        <img src='https://khamsat.hsoubcdn.com/assets/images/development-bb416454cb6338d96f266211eb8d2e10fc669ddb8470ee95eef00c841df903e8.jpg' />
                        <div className="overlady">
                            <Link >اعمال</Link>
                        </div>
                    </div>
                    <div className='item'>
                        <img src='https://khamsat.hsoubcdn.com/assets/images/social-5598c2401b6ca90eda3df7c69c8c4727dcc937f8cc995096456d8a8773f4d324.jpg' />
                        <div className="overlady">
                            <Link >اعمال</Link>
                        </div>
                    </div>
                    <div className='item'>
                        <img src='https://khamsat.hsoubcdn.com/assets/images/remote-64132428314c98f2e8abe5e4b98b3a03f215fdd04788b533f52171026fb30d70.jpg' />
                        <div className="overlady">
                            <Link >اعمال</Link>
                        </div>

                    </div>
                    <div className='item'>
                        <img src='https://khamsat.hsoubcdn.com/assets/images/development-bb416454cb6338d96f266211eb8d2e10fc669ddb8470ee95eef00c841df903e8.jpg' />
                        <div className="overlady">
                            <Link >اعمال</Link>
                        </div>
                    </div> */}
                </div>
            </div>

            <br />
            <br />
        </div>
    )
}

export default Whymysite