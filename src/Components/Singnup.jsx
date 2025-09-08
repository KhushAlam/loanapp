import React from 'react'
import Breadcrum from "./Breadcrum"

export default function Singnup() {
    return (
        <>
            <Breadcrum title="Create your user Account" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-9 mt-5">
                        <div className="row">
                            <h4 className='btn btn-primary text-light text-center mb-5 w-100'>Create your account</h4>
                            <div className="col-md-6 mb-3">
                                <input type="text" name="name" placeholder='Enter your name' className='form-control border-3 border-primary' />
                            </div>
                            <div className="col-md-6 mb-3">
                                <input type="text" name="mobile" placeholder='Enter your mobile' className='form-control border-3 border-primary' />
                            </div>
                            <div className="col-md-6 mb-3">
                                <input type="text" name="mobile" placeholder='Enter your mobile' className='form-control border-3 border-primary' />
                            </div>
                            <div className="col-md-6 mb-3">
                                <input type="text" name="mobile" placeholder='Enter your mobile' className='form-control border-3 border-primary' />
                            </div>
                            <div className="col-md-6 mb-3">
                                <input type="text" name="mobile" placeholder='Enter your mobile' className='form-control border-3 border-primary' />
                            </div>
                            <div className="col-md-6 mb-3">
                                <input type="text" name="mobile" placeholder='Enter your mobile' className='form-control border-3 border-primary' />
                            </div>
                            <div className="col-md-6 mb-3">
                                <input type="text" name="mobile" placeholder='Enter your mobile' className='form-control border-3 border-primary' />
                            </div>
                            <div className="col-md-6 mb-3">
                                <input type="text" name="mobile" placeholder='Enter your mobile' className='form-control border-3 border-primary' />
                            </div>
                            <div className="col-md-6 mb-3">
                                <input type="text" name="mobile" placeholder='Enter your mobile' className='form-control border-3 border-primary' />
                            </div>
                            <div className="col-md-6 mb-3">
                                <input type="text" name="mobile" placeholder='Enter your mobile' className='form-control border-3 border-primary' />
                            </div>
                            <div className="col-md-12 mb-3">
                                <button type="submit" className='btn btn-primary w-100 border-3 border-primary'>Signup</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
