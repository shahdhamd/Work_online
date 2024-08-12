import React from 'react'

function SellerProfile() {
    return (
        <>
            <div className='py-5 seller'>

                <div>
                    <div style={{ width: '128px', position: 'relative' }}>
                        <img src="https://avatars.hsoubcdn.com/bb50208aa6bc6189ef92cf484e4103bb?s=256" alt="" width={'100%'} className='profile-img' />
                        <img src="https://khamsat.hsoubcdn.com/assets/images/verification-badge-f5965383075555aa8eee4d3e33aff856645f43585e7ac1fa56eed14203f46e00.svg" alt="" style={{ position: 'absolute', bottom: '10', right: '16' }} />
                    </div>
                    <h2 className='username'>
                        .Mohamed W
                    </h2>
                    <span style={{ fontSize: ' 12px' }}><i className="fa-solid fa-user"></i>
                        بائع نشيط
                    </span>

                </div>
            </div ></>
    )
}

export default SellerProfile