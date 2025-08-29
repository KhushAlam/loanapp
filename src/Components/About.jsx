import React from 'react'
import { Link } from 'react-router-dom'

export default function About() {
    return (
        <>
            <div className="about-low-area section-padding2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-12">
                            <div className="about-caption mb-50">
                                <div className="section-tittle mb-35">
                                    <span>About Our Company</span>
                                    <h2>Building a Brighter Financial Future with Excellent Support.</h2>
                                </div>
                                <p>We are committed to empowering individuals and small businesses with flexible financial solutions tailored to their needs. Our team of experts ensures quick, transparent, and trustworthy services, helping clients manage their finances effectively and achieve their goals.</p>
                                <p>With years of experience in the financial sector, we focus on providing seamless loan processing, clear guidance, and ongoing support to ensure every client’s success.</p>
                                <Link className="btn btn-primary" to="/loan/application">Apply for loan</Link>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12">
                            <div className="about-img ">
                                <div className="about-font-img d-none d-lg-block">
                                    <img src="assets/img/gallery/about2.png" alt="" />
                                </div>
                                <div className="about-back-img ">
                                    <img src="assets/img/gallery/about1.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
