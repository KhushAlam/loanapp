import React from 'react'
import Breadcrum from './Breadcrum'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <>
    <Breadcrum title="Login page :- Login into system"/>
      <div className="container-fluid">
        <div className="row mb-5 justify-content-center align-items-center">
          <h4 className='btn btn-primary text-light  mb-5 w-100'>Login into System</h4>
          <div className="col-md-6 col-lg-6 mt-3">
            <form>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Enter username/email"
                  className="form-control form-control border-3 border-primary"
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  placeholder="Enter password"
                  className="form-control form-control border-3 border-primary"
                />
              </div>
              <div className="mb-3">
                <button
                  type="submit"
                  className="btn btn-primary btn w-100"
                >
                  Login
                </button>
              </div>
            </form>
            <div className="mb-3">
              <Link to="/forgetpassword" className="text-decoration-none">Forget your password</Link>
              <Link to="/signup" className='text-decoration-none float-end'>Create your account</Link>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
