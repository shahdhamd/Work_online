import React, { useEffect, useState } from 'react'
import './NavLink.css'
import { Link } from 'react-router-dom';

function NavLink({ services, loginData }) {
  const [open, setOpen] = useState(false)
 
  useEffect(() => {
    console.log(services)
  }, [])
  return (
    <>
      <ul>
        {
          loginData ? <> <li style={{ padding: ' 20px', fontSize: '1.1rem' }}><Link to="/new"><i className="fa-solid fa-plus"></i> اضافة خدمة </Link></li>
            <li style={{ padding: ' 20px', fontSize: '1.1rem' }}><Link to="/new"><i className="fa-solid fa-folder-open" ></i>  المشتريات</Link></li>
            <li style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 20px 10px 20px', fontSize: '1.1rem' }} onClick={() => setOpen(prev => !prev)} >  <label >  <i className="fa-solid fa-table-cells-large" ></i> التصنيفات</label> {open ? <i className="fa-solid fa-chevron-down"></i> : <i className="fa-solid fa-chevron-left"></i>} </li>
            <ul>
              {open && services && services.map((ss) => (
                 <Link to={`/category/${ss._id}`}> <li style={{ padding: ' 10px 20px' }} key={ss._id}>{ss.name}</li></Link>
                ))}

            </ul>
          </> :
            <>
              <li style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 20px 10px 20px', fontSize: '1.1rem' }} onClick={() => setOpen(prev => !prev)} >  <label >  <i className="fa-solid fa-table-cells-large" ></i> التصنيفات</label> {open ? <i className="fa-solid fa-chevron-down"></i> : <i className="fa-solid fa-chevron-left"></i>} </li>
              <ul>
                {open && services && services.map((ss) => (
                 <Link to={`/category/${ss._id}`}> <li style={{ padding: ' 10px 20px' }} key={ss._id}>{ss.name}</li></Link>
                ))}

              </ul>

            </>
        }



      </ul>

    </>
  );
};

export default NavLink