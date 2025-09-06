import React from 'react'

export default function Newslatters() {
    return (
        <>
            <section className="newsletter py-5 bg-light text-center">
                <div className="container">
                    <h3 className="mb-3">Why Choose Our Loan Services?</h3>
                    <p className="mb-5">We provide high-performance financial solutions designed to meet your personal and business needs.</p>

                    <div className="row">
                        <div className="col-md-3 mb-4">
                            <div className="card h-100 shadow-sm p-3">
                                <h5 className="mb-3">Personal Loan</h5>
                                <p>Quick approval with flexible EMIs to manage medical, travel, or lifestyle expenses with ease.</p>
                            </div>
                        </div>

                        <div className="col-md-3 mb-4">
                            <div className="card h-100 shadow-sm p-3">
                                <h5 className="mb-3">Business Loan</h5>
                                <p>Get easy financing for working capital, business expansion, and managing daily operations smoothly.</p>
                            </div>
                        </div>

                        <div className="col-md-3 mb-4">
                            <div className="card h-100 shadow-sm p-3">
                                <h5 className="mb-3">Commercial Loan</h5>
                                <p>High-value loans for enterprises to fund projects, expansions, and long-term growth opportunities.</p>
                            </div>
                        </div>

                             <div className="col-md-3 mb-4">
                            <div className="card h-100 shadow-sm p-3">
                                <h5 className="mb-3">Construction Loan</h5>
                                <p>Flexible financing to build new properties, renovate, or complete construction projects on time.</p>
                            </div>
                        </div>
                    </div>

                     {/* <form className="d-flex justify-content-center mt-4">
                        <input type="email" className="form-control w-50 me-2" placeholder="Enter your email" required />
                        <button type="submit" className="btn btn-primary">Subscribe</button>
                    </form> */}
                    <small className="d-block mt-2 text-muted">We respect your privacy. No spam, only useful updates.</small>
                </div>
            </section>

        </>
    )
}
