import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <>
            <div className="slider-area slider-height" data-background="assets/img/hero/h1_hero.jpg">
                <div className="slider-active">
                    <div className="single-slider">
                        <div className="slider-cap-wrapper">
                            <div className="hero__caption">
                                <p data-animation="fadeInLeft" data-delay=".2s">Achieve your financial goal</p>
                                <h2 data-animation="fadeInLeft" data-delay=".5s">Small Business Loans for Daily Expenses <br />
                                    Fast, Flexible & Affordable Designed for Your Business.</h2>

                                <Link to="/loan/application" className='btn btn-primary'>Apply for Loan</Link>
                            </div>
                            <div className="hero__img">
                                <img src="assets/img/hero/hero_img.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="single-slider">
                        <div className="slider-cap-wrapper">
                            <div className="hero__caption">
                                <p data-animation="fadeInLeft" data-delay=".2s">Achieve your financial goal</p>
                                <h1 data-animation="fadeInLeft" data-delay=".5s">Small Business Loans For Daily Expenses.</h1>

                                <Link to="/loan/application" className='btn btn-primary'>Apply for Loan</Link>
                            </div>
                            <div className="hero__img">
                                <img src="assets/img/hero/hero_img2.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="slider-footer section-bg d-none d-sm-block mt-3">
                    <div className="footer-wrapper">
                        <div className="single-caption">
                            <div className="single-img">
                                <img src="assets/img/hero/hero_footer.png" alt="" />
                            </div>
                        </div>

                        <div className="single-caption">
                            <div className="caption-icon">
                                <span className="flaticon-clock"></span>
                            </div>
                            <div className="caption">
                                <p>Quick & Easy Loan</p>
                                <p>Approvals</p>
                            </div>
                        </div>
                        <div className="single-caption">
                            <div className="caption-icon">
                                <span className="flaticon-like"></span>
                            </div>
                            <div className="caption">
                                <p>Quick & Easy Loan</p>
                                <p>Approvals</p>
                            </div>
                        </div>
                        <div className="single-caption">
                            <div className="caption-icon">
                                <span className="flaticon-money"></span>
                            </div>
                            <div className="caption">
                                <p>Quick & Easy Loan</p>
                                <p>Approvals</p>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

        </>
    )
}
