import React, { use, useEffect, useState } from 'react'
import Sidebar from "../../../Components/Sidebar"
import Breadcrum from '../../../Components/Breadcrum'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Formvalidator from '../../../Validator/Formvalidator'
import Filevalidator from '../../../Validator/Filevalidator'
import { Createloan, Getloan, Updateloan } from "../../../Redux/ActionCreator/Loanactioncreator"


export default function Loanapplicationupdate() {
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let loanStatedata = useSelector(state => state.loanStatedata);
   let {id} =useParams()

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
        pancard: ""
    })
    let [errormassege, seterrormassege] = useState({
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
        pancard: ""
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

            const Fromdata  = new FormData()
            Object.keys(data).forEach((key)=>{
                Fromdata.append(key,data[key]);
            })
            dispatch(Updateloan(Fromdata));
            navigate('/admin/loanapplication')
        } 
    }

   useEffect(()=>{
    dispatch(Getloan())
    if(loanStatedata.length){
        setdata(loanStatedata.find((x)=>x._id===id))
    }
   },[loanStatedata.length,id])


    return (
        <>
            <Breadcrum title="Admin --> Loan Update" />
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9 mt-3">
                        <h4 className='btn btn-primary w-100 mb-3'>Loan Applications Update<Link to="/admin/loanapplication"><span><i className='fa fa-arrow-left float-end text-light fs-5'></i></span></Link></h4>
                        <form onSubmit={postdata}>
                            <div className="row">
                                <div className="col-md-6 mb-3 ">
                                    <lebel>Loan Type*</lebel>
                                    <select name="loantype" onChange={inputdata} value={data.loantype} className={`form-control form-select border-3 ${show && errormassege.loantype ? "border-danger" : "border-primary"}`}>
                                        <option value="Select Loan Type">Select Loan Type</option>
                                        <option value="BusinessLoan">Business Loan</option>
                                        <option value="CommercialLoan">Commercial Loan</option>
                                        <option value="ConstractionLoan">Constraction Loan</option>
                                        <option value="Personal Loan">Personal Loan</option>
                                    </select>
                                    {show && errormassege.loantype ? <p className='text-danger'>{errormassege.loantype}</p> : null}
                                </div>
                                <div className="col-md-6 mb-3 ">
                                    <label>Amount*</label>
                                    <input
                                        onChange={inputdata}
                                        type="number"
                                        value={data.amount}
                                        name="amount"
                                        placeholder="Enter loan amount"
                                        className={`form-control border-3 ${show && errormassege.amount ? 'border-danger' : 'border-primary'}`}
                                    />
                                    {show && errormassege.amount && <p className="text-danger">{errormassege.amount}</p>}
                                </div>

                                {/* Duration */}
                                <div className="col-md-6 mb-3 ">
                                    <label>Duration*</label>
                                    <input
                                        onChange={inputdata}
                                        type="number"
                                        name="duration"
                                        value={data.duration}
                                        placeholder="Enter loan duration"
                                        className={`form-control border-3 ${show && errormassege.duration ? 'border-danger' : 'border-primary'}`}
                                    />
                                    {show && errormassege.duration && <p className="text-danger">{errormassege.duration}</p>}
                                </div>

                                {/* Name */}
                                <div className="col-md-6 mb-3 ">
                                    <label>Name*</label>
                                    <input
                                        onChange={inputdata}
                                        type="text"
                                        name="name"
                                        value={data.name}
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
                                        value={data.fname}
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
                                        value={data.mname}
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
                                        value={data.aadhar}
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
                                        type="number"
                                        name="mobile"
                                        value={data.mobile}
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
                                        value={data.email}
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
                                        value={data.bankn}
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
                                        value={data.ifsc}
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
                                        value={data.account}
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
                                        value={data.workingtype}
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
                                        value={data.income}
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
                                        value={data.address}
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
                                    <button className='btn btn-primary w-100 text-light text-center mb-5'>Update</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
