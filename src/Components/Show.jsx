import React, { useEffect, useState } from 'react'
import Breadcrum from "./Breadcrum"
import Sidebar from './Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Getloan, Updateloan } from "../Redux/ActionCreator/Loanactioncreator"
import { Createpayment } from "../Redux/ActionCreator/Paymentactioncreator"
export default function Show() {
    let { id } = useParams()
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let [data, setdata] = useState([]);
    let loanStatedata = useSelector(state => state.loanStatedata);

    useEffect(() => {
        dispatch(Getloan())
        if (loanStatedata.length) {
            setdata(loanStatedata.find(x => x._id === id))
        }
    }, [])

    function approveapplication(id) {
        if (window.confirm("You want to approve this application")) {
            let item = loanStatedata.find(x => x._id === id)
            console.log(item);
            if (item) {
                const updateddata = { ...data, status: "Approved" };
                const Fromdata = new FormData()
                Object.keys(updateddata).forEach((key) => {
                    Fromdata.append(key, updateddata[key]);
                })
                dispatch(Updateloan(Fromdata));
                navigate("/admin/loanapplication");
            }
        }
    }
    function rejectapplication(id) {
        if (window.confirm("Do you want to reject this application")) {
            let item = loanStatedata.find(x => x._id === id)
            if (item) {
                const updateddata = { ...data, status: "Rejected" };
                const Fromdata = new FormData()
                Object.keys(updateddata).forEach((key) => {
                    Fromdata.append(key, updateddata[key]);
                })
                dispatch(Updateloan(Fromdata));
                navigate("/admin/loanapplication")
            }
        }
    }
    return (
        <>
            <Breadcrum title="Show Application Details" />
            <div className="container-fluid mt-3">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h4 className='btn btn-primary w-100 p-2 text-light'>Applications Details </h4>
                        <div className="table-responsive mt-3">
                            <table className='table  table-striped table-hover w-80'>
                                <tbody>
                                    <tr>
                                        <th>Photo</th>
                                        <td>
                                            <Link to={`${process.env.REACT_APP_BACKEND_SERVER}${data.pic}`} target='_blank' rel="noopener noreferrer">
                                                <img src={`${data.pic}`} height={100} width={150} />
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Name</th>
                                        <td>{data.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Loan Type</th>
                                        <td>{data.loantype}</td>
                                    </tr>
                                    <tr>
                                        <th>Amount</th>
                                        <td>{data.amount}</td>
                                    </tr>
                                    <tr>
                                        <th>Duration</th>
                                        <td>{data.duration}</td>
                                    </tr>
                                    <tr>
                                        <th>Mobile</th>
                                        <td>{data.mobile}</td>
                                    </tr>
                                    <tr>
                                        <th>Email</th>
                                        <td>{data.email}</td>
                                    </tr>
                                    <tr>
                                        <th>Status</th>
                                        <td>{data.status}</td>
                                    </tr>
                                    <tr><th>Address</th>
                                        <td>{data.address}</td>
                                    </tr>

                                    <tr>
                                        <th>Aadhar Card</th>
                                        <td><Link href={`${process.env.REACT_APP_BACKEND_SERVER}${data.aadharcard}`} target='_blank' rel="noopener noreferrer">
                                            <iframe src={`${process.env.REACT_APP_BACKEND_SERVER}${data.aadharcard}`} frameborder="0" height={200} width={300}></iframe></Link></td>
                                    </tr>
                                    <tr>
                                        <th>Pan Card</th>
                                        <td><Link href={`${process.env.REACT_APP_BACKEND_SERVER}${data.pancard}`} target='_blank' rel="noopener noreferrer">
                                            <iframe src={`${process.env.REACT_APP_BACKEND_SERVER}${data.pancard}`} frameborder="0" height={200} width={300}></iframe></Link></td>
                                    </tr>
                                    <tr>
                                        <th>Salary Slip</th>
                                        <td><Link href={`${process.env.REACT_APP_BACKEND_SERVER}${data.salaryslip}`} target='_blank' rel="noopener noreferrer">
                                            <iframe src={`${process.env.REACT_APP_BACKEND_SERVER}${data.salaryslip}`} frameborder="0" height={200} width={300}></iframe></Link></td>
                                    </tr>
                                    <tr>
                                        <th>Bank Passbook</th>
                                        <td><Link href={`${process.env.REACT_APP_BACKEND_SERVER}${data.bankpassbook}`} target='_blank' rel="noopener noreferrer">
                                            <iframe src={`${process.env.REACT_APP_BACKEND_SERVER}${data.bankpassbook}`} frameborder="0" height={200} width={300}></iframe></Link></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className='h-20 w-100 content-center mb-5 mt-5'>
                                <button className='btn btn-primary w-50' onClick={() => { approveapplication(data._id) }}>Approve</button>
                                <button className='btn btn-danger w-50' onClick={() => { rejectapplication(data._id) }}>Reject</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
