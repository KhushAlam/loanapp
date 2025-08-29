import React, { useEffect, useState } from 'react'
import Sidebar from "../../../Components/Sidebar"
import Breadcrum from '../../../Components/Breadcrum'
import { Link, useNavigate } from 'react-router-dom'
import { Createloan } from "../../../Redux/ActionCreator/Loanactioncreator"
import { Getservice } from "../../../Redux/ActionCreator/Serviceactioncreater"

import { useDispatch, useSelector } from 'react-redux'
import Formvalidator from '../../../Validator/Formvalidator'
import Filevalidator from '../../../Validator/Filevalidator'
export default function Loanapplicationcreate() {
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let loanStatedata = useSelector(state => state.loanStatedata);
    let serviceStatedata = useSelector(state => state.serviceStatedata);


    let [servicedata, setservices] = useState([]);
    let [data, setdata] = useState({
        loantype: "",
        amount: "",
        duration: "",
        name: "",
        fname: "",
        mname: "",
        aadhar: "",
        mobile: "",
        email: "",
        bankn: "",
        ifsc: "",
        account: "",
        workingtype: "",
        income: "",
        address: "",
        pic: "",
        aadhar: "",
        salaryslip: "",
        bankpassbook: "",
        aadharcard: "",
        pancard: "",
        status: "Submited",
        date: new Date()
    })

    let [errormassege, seterrormassege] = useState({
        loantype: "Feild is Mandatory",
        amount: "Feild is Mandatory",
        duration: "Feild is Mandatory",
        name: "Feild is Mandatory",
        fname: "Feild is Mandatory",
        mname: "Feild is Mandatory",
        aadhar: "Feild is Mandatory",
        mobile: "Feild is Mandatory",
        email: "Feild is Mandatory",
        bankn: "Feild is Mandatory",
        ifsc: "Feild is Mandatory",
        account: "Feild is Mandatory",
        workingtype: "Feild is Mandatory",
        income: "Feild is Mandatory",
        address: "Feild is Mandatory",
        pic: "Feild is Mandatory",
        aadhar: "Feild is Mandatory",
        salaryslip: "Feild is Mandatory",
        bankpassbook: "Feild is Mandatory",
        aadharcard: "Feild is Mandatory",
        pancard: "Feild is Mandatory"
    })

    let [show, setshow] = useState(false);

    function inputdata(e) {
        let name = e.target.name;
        let value = e.target.files && e.target.files.length ? "loan/" + e.target.files[0].name : e.target.value;

        seterrormassege((old) => {
            return {
                ...old,
                [name]: e.target.files ? Filevalidator(e) : Formvalidator(e)
            }
        })

        setdata((old) => {
            return {
                ...old,
                [name]: value,
            }
        })
    }
    function postdata(e) {
        e.preventDefault();
        let error = Object.values(errormassege).find((x) => x !== "")
        if (error) {
            setshow(true)
        }
        else {
            let item = loanStatedata.find((x) => x.name !== data.name)
            if (item) {
                setshow(true)
                seterrormassege((old) => {
                    return {
                        ...old,
                        "name": "Same name is Available"
                    }
                })
                return
            }
            dispatch(Createloan({ ...data }));
            navigate('/admin/loanapplication')
        }
    }

    useEffect(() => {
        dispatch(Getservice())
        if (serviceStatedata.length) {
            setservices(serviceStatedata)
        }
    }, [serviceStatedata])


    return (
        <>
            <Breadcrum title="Admin --> Loan Create" />
            <div className="container-fluid">
                <div className="row ">
                    <div className="col-md-3 mt-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9 mt-3">
                        <h4 className='btn btn-primary w-100 mb-3'>Loan Applications Create<Link to="/admin/loanapplication"><span><i className='fa fa-arrow-left float-end text-light fs-5'></i></span></Link></h4>
                        <form onSubmit={postdata}>
                            <div className="row">
                                <div className="col-md-6 mb-3 ">
                                    <lebel>Loan Type*</lebel>
                                    <select name="loantype" onChange={inputdata} className={`form-control form-select border-3 ${show && errormassege.loantype ? "border-danger" : "border-primary"}`}>
                                        <option value="">Select Loan Type</option>
                                        {servicedata.map((item, index) => {
                                            return <option value={item.loantype} key={index}>{item.loantype}</option>
                                        })}
                                    </select>
                                    {show && errormassege.loantype ? <p className='text-danger'>{errormassege.loantype}</p> : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Amount*</label>
                                    <select name="amount" onChange={inputdata} className={`form-control form-select border-3 ${show && errormassege.amount ? "border-danger" : " border-primary"}`}>
                                        <option value="">Select Amount</option>
                                        {data.loantype === 'Personal' &&
                                            servicedata.filter((x) => x.loantype === "Personal")
                                                .map((item, index) => {
                                                    return <option value={item.amount} key={index}>{item.amount}</option>
                                                })}

                                        {data.loantype === 'Business' &&
                                            servicedata.filter((x) => x.loantype === "Business")
                                                .map((item, index) => {
                                                    return <option value={item.amount} key={index}>{item.amount}</option>
                                                })}
                                        {data.loantype === 'Commercial' &&
                                            servicedata.filter((x) => x.loantype === "Commercial")
                                                .map((item, index) => {
                                                    return <option value={item.amount} key={index}>{item.amount}</option>
                                                })}

                                        {data.loantype === 'Construction' &&
                                            servicedata.filter((x) => x.loantype === "Construction")
                                                .map((item, index) => {
                                                    return <option value={item.amount} key={index}>{item.amount}</option>
                                                })}
                                    </select>
                                    {show && errormassege.amount ? <p className='text-danger'>{errormassege.amount}</p> : null}
                                </div>

                                {/* Duration */}
                                <div className="col-md-6 mb-3 ">
                                    <label>Duration*</label>
                                    <select name="duration" className='form-control form-select border-3 border-primary' onChange={inputdata}>
                                        <option value="">Select duration</option>
                                        {data.loantype === 'Personal' &&
                                            servicedata.filter((x) => x.loantype === "Personal")
                                                .map((item, index) => {
                                                    return <option value={item.duration} key={index}>{item.duration}</option>
                                                })}
                                        {data.loantype === 'Business' &&
                                            servicedata.filter((x) => x.loantype === "Business")
                                                .map((item, index) => {
                                                    return <option value={item.duration} key={index}>{item.duration}</option>
                                                })}
                                        {data.loantype === 'Commercial' &&
                                            servicedata.filter((x) => x.loantype === "Commercial")
                                                .map((item, index) => {
                                                    return <option value={item.duration} key={index}>{item.duration}</option>
                                                })}

                                        {data.loantype === 'Construction' &&
                                            servicedata.filter((x) => x.loantype === "Construction")
                                                .map((item, index) => {
                                                    return <option value={item.duration} key={index}>{item.duration}</option>
                                                })}
                                    </select>
                                    {show && errormassege.duration && <p className="text-danger">{errormassege.duration}</p>}
                                </div>

                                {/* Name */}
                                <div className="col-md-6 mb-3 ">
                                    <label>Name*</label>
                                    <input
                                        onChange={inputdata}
                                        type="text"
                                        name="name"
                                        placeholder="Enter name"
                                        className={`form-control border-3 ${show && errormassege.name ? 'border-danger' : 'border-primary'}`}
                                    />
                                    {show && errormassege.name && <p className="text-danger">{errormassege.name}</p>}
                                </div>

                                {/* Father Name */}
                                <div className="col-md-6 mb-3 ">
                                    <label>Father Name*</label>
                                    <input
                                        onChange={inputdata}
                                        type="text"
                                        name="fname"
                                        placeholder="Enter father name"
                                        className={`form-control border-3 ${show && errormassege.fname ? 'border-danger' : 'border-primary'}`}
                                    />
                                    {show && errormassege.fname && <p className="text-danger">{errormassege.fname}</p>}
                                </div>

                                {/* Mother Name */}
                                <div className="col-md-6 mb-3 ">
                                    <label>Mother Name*</label>
                                    <input
                                        onChange={inputdata}
                                        type="text"
                                        name="mname"
                                        placeholder="Enter mother name"
                                        className={`form-control border-3 ${show && errormassege.mname ? 'border-danger' : 'border-primary'}`}
                                    />
                                    {show && errormassege.mname && <p className="text-danger">{errormassege.mname}</p>}
                                </div>

                                {/* Aadhaar */}
                                <div className="col-md-6 mb-3 ">
                                    <label>Aadhaar*</label>
                                    <input
                                        onChange={inputdata}
                                        type="text"
                                        name="aadhar"
                                        placeholder="Enter Aadhaar number"
                                        className={`form-control border-3 ${show && errormassege.aadhar ? 'border-danger' : 'border-primary'}`}
                                    />
                                    {show && errormassege.aadhar && <p className="text-danger">{errormassege.aadhar}</p>}
                                </div>

                                {/* Mobile */}
                                <div className="col-md-6 mb-3 ">
                                    <label>Mobile*</label>
                                    <input
                                        onChange={inputdata}
                                        type="text"
                                        name="mobile"
                                        placeholder="Enter mobile number"
                                        className={`form-control border-3 ${show && errormassege.mobile ? 'border-danger' : 'border-primary'}`}
                                    />
                                    {show && errormassege.mobile && <p className="text-danger">{errormassege.mobile}</p>}
                                </div>

                                {/* Email */}
                                <div className="col-md-6 mb-3 ">
                                    <label>Email*</label>
                                    <input
                                        onChange={inputdata}
                                        type="email"
                                        name="email"
                                        placeholder="Enter email address"
                                        className={`form-control border-3 ${show && errormassege.email ? 'border-danger' : 'border-primary'}`}
                                    />
                                    {show && errormassege.email && <p className="text-danger">{errormassege.email}</p>}
                                </div>

                                {/* Bank Name */}
                                <div className="col-md-6 mb-3 ">
                                    <label>Bank Name*</label>
                                    <input
                                        onChange={inputdata}
                                        type="text"
                                        name="bankn"
                                        placeholder="Enter bank name"
                                        className={`form-control border-3 ${show && errormassege.bankn ? 'border-danger' : 'border-primary'}`}
                                    />
                                    {show && errormassege.bankn && <p className="text-danger">{errormassege.bankn}</p>}
                                </div>

                                {/* IFSC */}
                                <div className="col-md-6 mb-3 ">
                                    <label>IFSC Code*</label>
                                    <input
                                        onChange={inputdata}
                                        type="text"
                                        name="ifsc"
                                        placeholder="Enter IFSC code"
                                        className={`form-control border-3 ${show && errormassege.ifsc ? 'border-danger' : 'border-primary'}`}
                                    />
                                    {show && errormassege.ifsc && <p className="text-danger">{errormassege.ifsc}</p>}
                                </div>

                                {/* Account Number */}
                                <div className="col-md-6 mb-3 ">
                                    <label>Account Number*</label>
                                    <input
                                        onChange={inputdata}
                                        type="text"
                                        name="account"
                                        placeholder="Enter account number"
                                        className={`form-control border-3 ${show && errormassege.account ? 'border-danger' : 'border-primary'}`}
                                    />
                                    {show && errormassege.account && <p className="text-danger">{errormassege.account}</p>}
                                </div>

                                {/* Working Type */}
                                <div className="col-md-6 mb-3 ">
                                    <label>Working Type*</label>
                                    <input
                                        onChange={inputdata}
                                        type="text"
                                        name="workingtype"
                                        placeholder="Enter working type"
                                        className={`form-control border-3 ${show && errormassege.workingtype ? 'border-danger' : 'border-primary'}`}
                                    />
                                    {show && errormassege.workingtype && <p className="text-danger">{errormassege.workingtype}</p>}
                                </div>

                                {/* Income */}
                                <div className="col-md-6 mb-3 ">
                                    <label>Income*</label>
                                    <input
                                        onChange={inputdata}
                                        type="number"
                                        name="income"
                                        placeholder="Enter monthly income"
                                        className={`form-control border-3 ${show && errormassege.income ? 'border-danger' : 'border-primary'}`}
                                    />
                                    {show && errormassege.income && <p className="text-danger">{errormassege.income}</p>}
                                </div>

                                {/* Address */}
                                <div className="col-md-6 mb-3 ">
                                    <label>Address*</label>
                                    <input
                                        onChange={inputdata}
                                        type="text"
                                        name="address"
                                        placeholder="Enter address"
                                        className={`form-control border-3 ${show && errormassege.address ? 'border-danger' : 'border-primary'}`}
                                    />
                                    {show && errormassege.address && <p className="text-danger">{errormassege.address}</p>}
                                </div>

                                {/* Photo */}
                                <div className="col-md-6 mb-3 ">
                                    <label>Photo*</label>
                                    <input
                                        onChange={inputdata}
                                        type="file"
                                        name="pic"
                                        className={`form-control border-3 ${show && errormassege.pic ? 'border-danger' : 'border-primary'}`}
                                    />
                                    {show && errormassege.pic && <p className="text-danger">{errormassege.pic}</p>}
                                </div>

                                {/* Salary Slip */}
                                <div className="col-md-6 mb-3 ">
                                    <label>Salary Slip*</label>
                                    <input
                                        onChange={inputdata}
                                        type="file"
                                        name="salaryslip"
                                        accept='application/pdf'
                                        className={`form-control border-3 ${show && errormassege.salaryslip ? 'border-danger' : 'border-primary'}`}
                                    />
                                    {show && errormassege.salaryslip && <p className="text-danger">{errormassege.salaryslip}</p>}
                                </div>
                                <div className="col-md-6 mb-3 ">
                                    <label>Bank Passbok*</label>
                                    <input
                                        onChange={inputdata}
                                        type="file"
                                        name="bankpassbook"
                                        accept='application/pdf'
                                        className={`form-control border-3 ${show && errormassege.bankpassbook ? 'border-danger' : 'border-primary'}`}
                                    />
                                    {show && errormassege.bankpassbook && <p className="text-danger">{errormassege.bankpassbook}</p>}
                                </div>
                                <div className="col-md-6 mb-3 ">
                                    <label>Aadhar Card*</label>
                                    <input
                                        onChange={inputdata}
                                        type="file"
                                        name="aadharcard"
                                        accept='application/pdf'
                                        className={`form-control border-3 ${show && errormassege.aadharcard ? 'border-danger' : 'border-primary'}`}
                                    />
                                    {show && errormassege.aadharcard && <p className="text-danger">{errormassege.aadharcard}</p>}
                                </div>
                                <div className="col-md-6 mb-3 ">
                                    <label>Pan Card*</label>
                                    <input
                                        onChange={inputdata}
                                        type="file"
                                        name="pancard"
                                        accept='application/pdf'
                                        className={`form-control border-3 ${show && errormassege.pancard ? 'border-danger' : 'border-primary'}`}
                                    />
                                    {show && errormassege.pancard && <p className="text-danger">{errormassege.pancard}</p>}
                                </div>
                                <div className="col-md-12">
                                    <button className='btn btn-primary w-100 text-light text-center mb-5'>Create Loan</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
