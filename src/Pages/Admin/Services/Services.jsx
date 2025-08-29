import React, { useEffect, useState } from 'react'
import Sidebar from "../../../Components/Sidebar"
import Breadcrum from '../../../Components/Breadcrum'
import { Link } from 'react-router-dom'
import { Getservice, Deleteservice } from "../../../Redux/ActionCreator/Serviceactioncreater"
import { useDispatch, useSelector } from 'react-redux'

export default function Services() {
    let serviceStatedata = useSelector(state => state.serviceStatedata);
    let dispatch = useDispatch();
    let [data, setdata] = useState([]);

    useEffect(() => {
        dispatch(Getservice())
    }, [serviceStatedata.length])

    useEffect(() => {
        setdata(serviceStatedata);
    }, [serviceStatedata])

    function deleteservice(id) {
        if (window.confirm("Are you Sure to delete")) {
            dispatch(Deleteservice({ id: id }))
        }
    }

    return (
        <>
            <Breadcrum title="Admin --> Loan Services" />
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h4 className='btn btn-primary w-100'>Loan Services<Link to="/admin/services/create"><i className='fa fa-plus float-end text-light fs-5'></i></Link></h4>
                        <div className="table-responsive mt-3">
                            <table className='table table-bordered table-striped'>
                                <thead>
                                    <tr>
                                        <th>Loan type</th>
                                        <th>Amount</th>
                                        <th>Interest</th>
                                        <th>Duration</th>
                                        <th>Installment</th>
                                        <th>Active</th>
                                        <th>edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item, index) => {
                                        return <tr key={index}>
                                            <td>{item.loantype}</td>
                                            <td>{item.amount}</td>
                                            <td>{item.interest}</td>
                                            <td>{item.duration}</td>
                                            <td>{item.installment}</td>
                                            <td>{item.active === true ? "Yes" : "No"}</td>
                                            <td><Link to={`/admin/services/update/${item.id}`}><button className='btn btn-primary mt-1'><i className='fa fa-edit text-light'></i></button></Link></td>
                                            <td><button className='btn btn-danger mt-1' onClick={() => { deleteservice(item.id) }}><i className='fa fa-trash text-light'></i></button></td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
