import React, { useEffect } from 'react'
import { Getservice } from "../Redux/ActionCreator/Serviceactioncreater";
import { useDispatch, useSelector } from 'react-redux';
import Breadcrum from './Breadcrum';
import { Link } from 'react-router-dom';

export default function Construction() {
    let dispatch = useDispatch();
    let serviceStatedata = useSelector(state => state.serviceStatedata);

    useEffect(() => {
        dispatch(Getservice());
    }, [serviceStatedata.lenght]);

  return (
    <>
            <Breadcrum title="Construction-Loan Service" />
            <div className="container-fluid">
                <h1 className='mt-3 btn btn-primary text-light w-100 p-2 mb-3'>Whole Information About Construction Loan</h1>
                <div className="row">
                    <div className="col-md-4">
                        <div className="card shadow-sm p-3 mb-4">
                            <h4 className="mb-3">Small Construction Loan</h4>
                            <p>Quick and easy loans designed to support small Construction with minimal paperwork and fast approval.</p>

                            <h6 className="mt-3">Required Documents:</h6>
                            <ul className="mb-3">
                                <li>Aadhaar / PAN Card (Identity Proof)</li>
                                <li>Construction Registration / GST Certificate</li>
                                <li>Address Proof (Utility Bill, Rent Agreement,Aadhar card etc.)</li>
                                <li>Last 6–12 Months Bank Statement/Salary Slip</li>
                                <li>Passport-size Photographs</li>
                                <li>Whole User Information like Address , mobile ,Email....</li>
                            </ul>

                            <a href="#" className="btn btn-primary">Apply Now</a>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <h3 className='btn btn-primary mb-3 w-100 p-2'>Loan Details And Emi</h3>
                        <div className="table-responsive">
                            <div className="d-flex flex-wrap gap-4 p-3 border rounded bg-light">
                                {serviceStatedata
                                    .filter((x) => x.loantype === "Construction")
                                    .map((item, index) => (
                                        <div key={index} className="d-flex flex-column text-start">
                                            <p>
                                                <strong>Loan Type:</strong> {item.loantype}
                                            </p>
                                            <p>
                                                <strong>Loan Amount:</strong> &#8377;{item.amount}
                                            </p>
                                            <p>
                                                <strong>Loan Duration:</strong> {item.duration}
                                            </p>
                                            <p>
                                                <strong>Interest:</strong> {item.interest}%
                                            </p>
                                            <p>
                                                <strong>Monthly Installment:</strong> &#8377;{item.installment}
                                            </p>
                                            <p>
                                                <strong>Total Amount:</strong> &#8377;{item.total}
                                            </p>
                                            <Link to='/loan/application'><button className='btn btn-primary text-light p-2'>Apply for Loan</button></Link>
                                        </div>
                                    ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
  )
}
