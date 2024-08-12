import React from 'react'
import './Spinner.css'
function Spinner() {
  return (
    <div>
      <div class="spinner" style={{ height: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
      </div>
    </div>
  )
}

export default Spinner