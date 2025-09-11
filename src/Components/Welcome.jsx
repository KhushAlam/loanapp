import React from 'react'
import Breadcrum from './Breadcrum'
import { Link } from 'react-router-dom'

export default function Welcome() {
  return (
    <>
      <Breadcrum title="Loan Submitted Page" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <h4 className='btn btn-primary text-light text-center w-100 mt-4 mb-5'>Your Application Sucssfully Submited</h4>
            <h1 className='ms-3'>Thank's for Applying</h1>
            <p className='ms-3'>Kepp Exploring Check Status in Your Profile</p>
            <Link to='/profile'><button className='btn btn-primary text-light w-100 mb-5 mt-5'>Profile</button></Link>
          </div>
        </div>
      </div>
    </>
  )
}
