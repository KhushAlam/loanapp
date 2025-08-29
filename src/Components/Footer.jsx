import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <>
            <footer>
                <div className="footer-area">
                    <div className="container">
                        <div className="footer-top footer-padding">
                            <div className="row justify-content-between">
                                <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6">
                                    <div className="single-footer-caption mb-50">
                                        <div className="single-footer-caption mb-30">
                                            <div className="footer-logo">
                                                <img src="assets/img/logo/logo2_footer.png" alt="" />
                                            </div>
                                            <div className="footer-pera">
                                                <p>Heaven fruitful doesn't over lesser days appear creeping seasons so behold bearing</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-2 col-lg-2 col-md-4 col-sm-6">
                                    <div className="single-footer-caption mb-50">
                                        <div className="footer-tittle">
                                            <h4>Quick Link</h4>
                                            <ul>
                                                <li><Link to="/about" className="text-decoration-none">About</Link></li>
                                                <li><Link to="/newslatter" className="text-decoration-none">Offers & Discounts</Link></li>
                                                <li><Link to="/services" className="text-decoration-none">Services</Link></li>
                                                <li><Link to="/contact" className="text-decoration-none"> Contact Us</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="single-footer-caption mb-50">
                                        <div className="footer-tittle">
                                            <ul>
                                                <li>1. Instant loan approval process</li>
                                                <li>2. Low interest rates starting from 9.5% p.a.</li>
                                                <li>3. Flexible EMI repayment options</li>
                                                <li>4. No hidden charges or processing fees</li>
                                                <li>5. Minimal documentation required</li>
                                                <li>6. 24x7 customer support available</li>
                                                <li>7. Track loan status online in real-time</li>
                                                <li>8. Safe and secure digital process</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                                    <div className="single-footer-caption mb-50">

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="footer-bottom">
                            <div className="row d-flex justify-content-between align-items-center">
                                <div className="col-xl-9 col-lg-8">
                                    <div className="footer-copy-right">
                                        <p>
                                            Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i className="fa fa-heart" aria-hidden="true"></i> by Colorlib
                                        </p>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-4">
                                    <div className="footer-social f-right">
                                        <i className="fab fa-twitter"></i>
                                        <i className="fab fa-facebook-f"></i>
                                        <i className="fas fa-globe"></i>
                                        <i className="fab fa-instagram"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <div id="back-top" >
                 <i className="fas fa-level-up-alt text-light"></i>
            </div>
        </>
    )
}
