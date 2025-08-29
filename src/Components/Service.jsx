import React from 'react'
import { Link } from 'react-router-dom'

export default function Service() {
    return (
        <>
            <div className="services-area pt-150 pb-150">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-10">
                            <div className="section-tittle text-center mb-80">
                                <span>Services that we are providing</span>
                                <h2>High-Performance Financial Solutions for Everyone.</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="single-cat text-center mb-50">
                                <div className="cat-icon">
                                    <span className="flaticon-work"></span>
                                </div>
                                <div className="cat-cap">
                                    <h5><Link to="/business">Business Loan</Link></h5>
                                    <p>Get quick and hassle-free loans to grow your small business with flexible repayment options.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="single-cat text-center mb-50">
                                <div className="cat-icon">
                                    <span className="flaticon-loan"></span>
                                </div>
                                <div className="cat-cap">
                                    <h5><Link to="/commercial">Commercial Loans</Link></h5>
                                    <p>Power your business growth with fast, reliable, and affordable commercial loan solutions.</p>                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="single-cat text-center mb-50">
                                <div className="cat-icon">
                                    <span className="flaticon-loan-1"></span>
                                </div>
                                <div className="cat-cap">
                                    <h5><Link to="/construction">Construction Loans</Link></h5>
                                    <p>Consectetur adipisicing elit, sed doeiusmod tempor incididunt ut labore et dolore</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="single-cat text-center mb-50">
                                <div className="cat-icon">
                                    <span className="flaticon-like"></span>
                                </div>
                                <div className="cat-cap">
                                    <h5><Link to="/personal">Personal Loan</Link></h5>
                                    <p>Get instant personal loans with minimal documentation, flexible EMIs, and quick approval to meet your urgent needs.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
