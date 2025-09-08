import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Breadcrum from './Breadcrum'
import { useNavigate, useParams } from 'react-router-dom'
import { Getloan } from '../Redux/ActionCreator/Loanactioncreator'
import { useDispatch, useSelector } from 'react-redux'

export default function Repaymentstatus() {
    let { id } = useParams()
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let loanStatedata = useSelector(state => state.loanStatedata)
    let [data, setdata] = useState([]);

    useEffect(() => {
        dispatch(Getloan());
    }, [dispatch]);


    useEffect(() => {
        if (loanStatedata && loanStatedata.length > 0) {
            setdata(loanStatedata.find((x) => x._id === id))
        }
    }, [loanStatedata, id])

    return (
        <>
            <Breadcrum title="Repayment Section" />
            <div className="container-fluid mt-3">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h4 className='btn btn-primary w-100 text-light text-center'>Emi With Time Section</h4>
                        <div className="table-responsive mt-3">
                            <table className='table table-borderd table-hover table-striped'>
                                <tbody>
                                    <tr>
                                        <th>id</th>
                                        <td>{data && data._id ? data._id.slice(0, 4) : null}</td>
                                    </tr>
                                    <tr>
                                        <th>Name</th>
                                        <td>{data.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Phone</th>
                                        <td>{data.mobile}</td>
                                    </tr>
                                    <tr>
                                        <th>email</th>
                                        <td>{data.email}</td>
                                    </tr>
                                    <tr>
                                        <th>Duration</th>
                                        <td>{data.duration}</td>
                                    </tr>
                                    <tr>
                                        <th></th>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="container-fluid">
                                <h4 className='btn btn-primary w-100 text-light text-center'>Repayment Section </h4>
                                <div className="row mt-3">
                                    {data?.installment?.map((item) => (
                                        <div key={item._id} className="col-md-3 mb-3">
                                            <div className="card shadow-sm h-100 border-0 rounded-3">
                                                <div className="card-body text-center">
                                                    <h5 className="card-title fw-bold">Month {item.month}</h5>
                                                    <p className="card-text mb-1">
                                                        <strong>Due:</strong> {new Date(item.duedate).toLocaleDateString()}
                                                    </p>
                                                    <span
                                                        className={`badge ${item.paid ? "bg-success" : "bg-warning text-dark"
                                                            }`}
                                                    >
                                                        {item.paid ? "Paid" : "Pending"}
                                                    </span><br />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
