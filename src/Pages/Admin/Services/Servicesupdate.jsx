import React, { useEffect, useState } from 'react';
import Sidebar from "../../../Components/Sidebar";
import Breadcrum from '../../../Components/Breadcrum';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Formvalidator from '../../../Validator/Formvalidator';
import { useDispatch, useSelector } from 'react-redux';
import { Getservice, Updateservice } from "../../../Redux/ActionCreator/Serviceactioncreater";

export default function Servicescreate() {
    let serviceStatedata = useSelector(state => state.serviceStatedata);
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let { id } = useParams();

    let [data, setdata] = useState({
        loantype: "",
        amount: "",
        interest: "",
        duration: "",
        installment: "",
        total: "",
        eligibility: "",
        active: ""
    });

    let [errormessage, seterrormessage] = useState({
        loantype: "",
        amount: "",
        interest: "",
        duration: "",
        installment: "",
        total: "",
        eligibility: "",

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

        setdata((old) => {
            return {
                ...old,
                [name]: value
            }
        });
    }

    function postdata(e) {
        e.preventDefault();
        let error = Object.values(errormessage).find((x) => x !== "");
        if (error) {
            setshow(true);
        } else {
            let item = serviceStatedata.find((x) => x.id !== id && Number(x.amount) === Number(data.amount));
            if (item) {
                setshow(true);
                seterrormessage((old) => ({
                    ...old,
                    amount: "Same Loan Amount Service already exists"
                }));
                return;
            }
            dispatch(Updateservice({ ...data }));
            navigate("/admin/services");
        }
    }
    useEffect(() => {
        dispatch(Getservice())
        if (serviceStatedata.length) {
            setdata(serviceStatedata.find((x) => x.id === id))
        }
    }, [serviceStatedata.length, id])

    return (
        <>
            <Breadcrum title="Admin --> Services Update" />
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h4 className='btn btn-primary w-100'>
                            Services Update
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
                                        value={data.amount}
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
                                        value={data.interest}
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
                                        value={data.duration}
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
                                        value={data.installment}
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
                                        value={data.total}
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
                                        value={data.eligibility}
                                    ></textarea>
                                    {show && errormessage.eligibility ? <p className='text-danger'>{errormessage.eligibility}</p> : null}
                                </div>

                                {/* Submit */}
                                <div className="col-md-12 mb-3">
                                    <button type="submit" className='form-control btn btn-primary w-100'>Update</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
