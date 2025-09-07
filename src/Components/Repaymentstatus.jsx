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
                                    </tr>
                                </tbody>
                            </table>

                            <h4 className='btn btn-primary text-light text-center w-100 mt-5'>Repayment installment</h4>
                            {
                                data.installment.map((item)=>{
                                    return <div>
                                        {item.month}
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
