import React from 'react'
import { Link } from 'react-router-dom'
function CardItem({ item, modelId, id ,getUserName }) {
  const serivceId = id;
  console.log('item', item)
  return (
    <>
      {item.user && item.user.length > 0 && (
        <div>
          <div className='item card'>
            <Link to={`/show/${serivceId}/${modelId}/${item.user[0]._id}`} style={{ padding: '15px 15px 0 15px' }}>
              <img src={item.user[0].image} alt="" />
            </Link>
            <div className="text">
              <p>{item.user[0].servicesName}</p>
              <p>{item.user[0].instructions}</p>

              <div className="rating">
                <i className="fa-regular fa-star fill"></i>
                <i className="fa-regular fa-star fill"></i>
                <i className="fa-regular fa-star fill"></i>
                <i className="fa-regular fa-star fill"></i>
                <i className="fa-regular fa-star"></i>
              </div>
              <span className='price'>${item.user[0].price}</span>
              
            </div>
            <div className="person">
              <Link>
                <p>
                  <i className="fa-solid fa-user" style={{ color: '#444' }}></i> {getUserName(item.user[0].createdBy)}
                  {/* <i className="fa-solid fa-user" style={{ color: '#444' }}></i> بلاتن */}
                
                </p>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CardItem
