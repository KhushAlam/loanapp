import React from 'react'
import Breadcrum from './Breadcrum'
import { Link } from 'react-router-dom'

export default function Welcome() {
  return (
    <>
      <Breadcrum title="Loan Submitted Page"/>
       <div className="container-fluid">
            <h4 className='btn btn-primary text-light text-center'>Your Application Sucssfully Submited</h4>
        <div className="row">
          <div className="col-md-6">
            <h1>Thank's for Applying</h1>
            <p>Kepp Exploring Check Status in Your Profile</p>
            <Link to='/profile'><button className='btn btn-primary text-light w-100'>Profile</button></Link>
          </div>
        </div>
       </div>
    </>
  )
}
