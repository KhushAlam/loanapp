import React, { useEffect } from 'react'
import { Gettestimonial } from "../Redux/ActionCreator/Testimonialactioncreator";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
export default function Testimonial() {
    let dispatch = useDispatch();
    let testimonialStatedata = useSelector(state => state.testimonialStatedata)

    useEffect(() => {
        dispatch(Gettestimonial());
    }, [testimonialStatedata])
    return (
        <>
            <div className="container-fluid py-4">
                <div className="row">
                    <div className="col-md-6">
                        <div className="p-4 shadow rounded bg-light h-100">
                            <h2 className="text-primary fw-bold mb-3">What Our Customers Say</h2>
                            <p className="text-muted">
                                Our LoanApp is trusted by thousands of happy customers. From easy
                                application process to quick approval and transparent policies,
                                we make sure your financial journey is smooth and stress-free.
                            </p>

                            <div className="mt-4">
                                <div className="card border-0 shadow-sm mb-3">
                                    <div className="card-body">
                                        <p className="fst-italic">
                                            "LoanApp helped me get a personal loan within 24 hours.
                                            The process was simple and completely hassle-free!"
                                        </p>
                                        <h6 className="fw-bold mb-0 text-primary">– Rakesh Kumar, Delhi</h6>
                                    </div>
                                </div>

                                <div className="card border-0 shadow-sm">
                                    <div className="card-body">
                                        <p className="fst-italic">
                                            "I used LoanApp for my business expansion. The flexible repayment
                                            options really made it easy for me to grow without stress."
                                        </p>
                                        <h6 className="fw-bold mb-0 text-primary">– Anita Sharma, Mumbai</h6>
                                    </div>
                                </div>
                            </div>

                            <div className="text-end mt-4">
                                <Link to="/loan/application">
                                    <button className="btn btn-primary rounded-pill px-4">
                                        Apply for Loan
                                    </button></Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div
                            id="carouselExampleIndicators"
                            className="carousel slide shadow rounded-3 border border-primary"
                            data-bs-ride="carousel"
                        >
                            <div className="carousel-indicators">
                                {testimonialStatedata.map((_, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        data-bs-target="#carouselExampleIndicators"
                                        data-bs-slide-to={index}
                                        className={index === 0 ? "active" : ""}
                                        aria-current={index === 0 ? "true" : "false"}
                                        aria-label={`Slide ${index + 1}`}
                                    ></button>
                                ))}
                            </div>
                            <div className="carousel-inner">
                                {testimonialStatedata.map((item, index) => (
                                    <div
                                        className={`carousel-item ${index === 0 ? "active" : ""}`}
                                        key={index}
                                    >
                                        <div className="d-flex flex-column align-items-center p-4">
                                            <div className="img mb-3">
                                                <a
                                                    href={`${process.env.REACT_APP_BACKEND_SERVER}${item.pic}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    <img
                                                        src={`${process.env.REACT_APP_BACKEND_SERVER}${item.pic}`}
                                                        height={150}
                                                        width={150}
                                                        className="rounded-circle border border-primary"
                                                        alt={item.name}
                                                    />
                                                </a>
                                            </div>

                                            <div className="details text-center">
                                                <div className="table-responsive">
                                                    <table className="table table-borderless text-start">
                                                        <tbody>
                                                            <tr>
                                                                <th className="text-primary">Name:</th>
                                                                <td>{item.name}</td>
                                                            </tr>
                                                            <tr>
                                                                <th className="text-primary">City:</th>
                                                                <td>{item.city}</td>
                                                            </tr>
                                                            <tr>
                                                                <th className="text-primary">Description:</th>
                                                                <td> <div
                                                                    className="overflow-auto custom-scroll"
                                                                    style={{ maxHeight: "100px", whiteSpace: "pre-wrap", paddingRight: "5px" }}
                                                                >
                                                                    {item.discription}
                                                                </div></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                className="carousel-control-prev"
                                type="button"
                                data-bs-target="#carouselExampleIndicators"
                                data-bs-slide="prev"
                            >
                                <span
                                    className="carousel-control-prev-icon bg-primary rounded-circle p-2"
                                    aria-hidden="true"
                                ></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button
                                className="carousel-control-next"
                                type="button"
                                data-bs-target="#carouselExampleIndicators"
                                data-bs-slide="next"
                            >
                                <span
                                    className="carousel-control-next-icon bg-primary rounded-circle p-2"
                                    aria-hidden="true"
                                ></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
