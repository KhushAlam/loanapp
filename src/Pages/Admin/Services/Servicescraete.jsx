import React, { useState } from 'react';
import Sidebar from "../../../Components/Sidebar";
import Breadcrum from '../../../Components/Breadcrum';
import { Link, useNavigate } from 'react-router-dom';
import Formvalidator from '../../../Validator/Formvalidator';
import { useDispatch, useSelector } from 'react-redux';
import Createservice from "../../../Redux/ActionCreator/Serviceactioncreater";

export default function Servicescreate() {
    let serviceStatedata = useSelector(state => state.serviceStatedata);
    let dispatch = useDispatch();
    let navigate = useNavigate();

    let [data, setdata] = useState({
        loantype: "",
        amount: "",
        interest: "",
        duration: "",
        installment: "",
        total: "",
        eligibility: "",
        active: true
    });

    let [errormessage, seterrormessage] = useState({
        loantype: "Feild is Mandatory",
        amount: "Feild is Mandatory",
        interest: "Feild is Mandatory",
        duration: "Feild is Mandatory",
        installment: "Feild is Mandatory",
        total: "Feild is Mandatory",
        eligibility: "Feild is Mandatory",

    });

    let [show, setshow] = useState(false);

    function inputdata(e) {
        let name = e.target.name;
        let value = e.target.value;

        // Validation result
        let error = Formvalidator(e);

        seterrormessage((old) => ({
            ...old,
            [name]: error
        }));

        setdata((old) => ({
            ...old,
            [name]: value
        }));
    }

    function postdata(e) {
        e.preventDefault();
        let error = Object.values(errormessage).find((x) => x !== "");
        if (error) {
            setshow(true);
        } else {
            let item = serviceStatedata.find((x) => Number(x.amount) === Number(data.amount));
            if (item) {
                setshow(true);
                seterrormessage((old) => ({
                    ...old,
                    amount: "Same Loan Amount Service already exists"
                }));
                return;
            }

            const Fromdata = new FormData()
            Object.keys(data).forEach((key) => {
                Fromdata.append(key, data[key]);
            })

            dispatch(Createservice(Fromdata));
            navigate("/admin/services");
        }
    }

    return (
        <>
            <Breadcrum title="Admin --> Services Create" />
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h4 className='btn btn-primary w-100'>
                            Services Create
                            <Link to="/admin/Services">
                                <span><i className='fa fa-arrow-left float-end text-light fs-5'></i></span>
                            </Link>
                        </h4>
                        <form onSubmit={postdata}>
                            <div className="row mt-3">

                                {/* Loan Type */}
                                <div className='col-md-6 mb-3'>
                                    <select
                                        className={`form-control form-select border-3 ${show && errormessage.loantype ? 'border-danger' : 'border-primary'}`}
                                        onChange={inputdata}
                                        name="loantype"
                                        value={data.loantype}
                                    >
                                        <option value="">Select Loan Type</option>
                                        <option value="Business">Business loan</option>
                                        <option value="Commercial">Commercial loan</option>
                                        <option value="Construction">Construction loan</option>
                                        <option value="Personal">Personal loan</option>
                                    </select>
                                    {show && errormessage.loantype ? <p className='text-danger'>{errormessage.loantype}</p> : null}
                                </div>

                                {/* Amount */}
                                <div className='col-md-6 mb-3'>
                                    <input
                                        type="number"
                                        name="amount"
                                        onChange={inputdata}
                                        className={`form-control border-3 ${show && errormessage.amount ? 'border-danger' : "border-primary"}`}
                                        placeholder='Enter Amount'
                                    />
                                    {show && errormessage.amount ? <p className='text-danger'>{errormessage.amount}</p> : null}
                                </div>

                                {/* Interest */}
                                <div className='col-md-6 mb-3'>
                                    <input
                                        type="number"
                                        name="interest"
                                        onChange={inputdata}
                                        className={`form-control border-3 ${show && errormessage.interest ? 'border-danger' : "border-primary"}`}
                                        placeholder='Enter Interest'
                                    />
                                    {show && errormessage.interest ? <p className='text-danger'>{errormessage.interest}</p> : null}
                                </div>

                                {/* Duration */}
                                <div className='col-md-6 mb-3'>
                                    <input
                                        type="number"
                                        name="duration"
                                        onChange={inputdata}
                                        className={`form-control border-3 ${show && errormessage.duration ? 'border-danger' : "border-primary"}`}
                                        placeholder='Enter duration'
                                    />
                                    {show && errormessage.duration ? <p className='text-danger'>{errormessage.duration}</p> : null}
                                </div>

                                {/* Installment */}
                                <div className='col-md-6 mb-3'>
                                    <input
                                        type="number"
                                        name="installment"
                                        onChange={inputdata}
                                        className={`form-control border-3 ${show && errormessage.installment ? 'border-danger' : "border-primary"}`}
                                        placeholder='Enter per month Installment'
                                    />
                                    {show && errormessage.installment ? <p className='text-danger'>{errormessage.installment}</p> : null}
                                </div>

                                {/* Total */}
                                <div className='col-md-6 mb-3'>
                                    <input
                                        type="number"
                                        name="total"
                                        onChange={inputdata}
                                        className={`form-control border-3 ${show && errormessage.total ? 'border-danger' : "border-primary"}`}
                                        placeholder='Enter Total Amount'
                                    />
                                    {show && errormessage.total ? <p className='text-danger'>{errormessage.total}</p> : null}
                                </div>

                                {/* Eligibility */}
                                <div className='col-md-12 mb-3'>
                                    <textarea
                                        name="eligibility"
                                        rows={3}
                                        onChange={inputdata}
                                        className={`form-control border-3 ${show && errormessage.eligibility ? "border-danger" : "border-primary"} w-100`}
                                        placeholder='Eligibility for loan...'
                                    ></textarea>
                                    {show && errormessage.eligibility ? <p className='text-danger'>{errormessage.eligibility}</p> : null}
                                </div>

                                {/* Submit */}
                                <div className="col-md-12 mb-3">
                                    <button type="submit" className='form-control btn btn-primary w-100'>Create</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
