import React from 'react'
import './Sections.css'
function Sections({ handleSearchChange }) {
  return (
    <div className='sections'>
      <form>
        <label htmlFor="servicesName" style={{ color: '#444' }}>
          بحث
        </label>
        <input type="text" name="servicesName" id="" onChange={handleSearchChange} />
      </form>
      <div>
        <p style={{ color: '#444' }}>الاقسام</p>
      </div>
    </div>
  )
}

export default Sections