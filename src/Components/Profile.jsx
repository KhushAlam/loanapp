import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Getloan } from "../Redux/ActionCreator/Loanactioncreator"
import { useDispatch, useSelector } from 'react-redux';

export default function Profile({ title }) {

    let dispatch = useDispatch()
    let loanStatedata = useSelector(state => state.loanStatedata);
    let [data, setdata] = useState([]);
    let [loandata, setloandata] = useState([]);

    useEffect(() => {
        (async () => {
            let responce = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}user/get/${localStorage.getItem("userid")}`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                },
            })

            responce = await responce.json()
            if (responce) {
                setdata(responce.data);
            }
        })()
    }, [])

    useEffect(() => {
        dispatch(Getloan())
        if (loanStatedata?.length) {
            setloandata(loanStatedata.find((x) => x.userid === localStorage.getItem("userid")))
        }
    }, [loanStatedata])
    return (
        <>
            <h4 className='btn btn-primary text-ligth text-center w-100 mt-2'>{title}</h4>
            <div className="container-fluid">
                <div className="row mt-4">
                    <div className="col-12 col-md-6 mb-3">
                        <div className="pic mt-2" style={{ width: "80%", maxWidth: 400 }}>
                            <img
                                src={data?.pic || "/assets/img/team/download.png"}
                                alt="Profile"
                                // style={{
                                //     width: "100%",
                                //     height: 500,
                                //     objectFit: "cover",
                                //     borderRadius: 8
                                // }}
                                height={400}
                                width="100%"
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-6 mt-3">
                        <div className="table-responsive">
                            <table className="table table-bordered table-striped w-100">
                                <tbody>
                                    <tr>
                                        <th>Name</th>
                                        <td>{data.name}</td>
                                    </tr>
                                    <tr>
                                        <th> username</th>
                                        <td>{data.username}</td>
                                    </tr>
                                    <tr>
                                        <th>Email</th>
                                        <td>{data.email}</td>
                                    </tr>
                                    <tr>
                                        <th>Phone</th>
                                        <td>{data.mobile}</td>
                                    </tr>
                                    <tr>
                                        <th>Active</th>
                                        <td>{data.active === true ? "Yes" : "No"}</td>
                                    </tr>
                                    <tr>
                                        <th>Role</th>
                                        <td>{data.role}</td>
                                    </tr>
                                    <tr>
                                        <th>Address</th>
                                        <td>{data.address}</td>
                                    </tr>
                                    <tr><th colSpan={2}><Link to={`/update/${data._id}`} className='btn btn-primary w-100 text-light text-center'>Update Profile</Link></th></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {localStorage.getItem("role") === "User" ? <>
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-9">
                            <h4 className='btn btn-primary text-light text-center w-100'>Applyed loan Details and Status/History</h4>
                            <div className="table-responsive mt-5">
                                <table className='table table-bordered table-striped table-hover'>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Amount</th>
                                            <th>Duration</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{loandata?._id?.slice(0, 4)}</td>
                                            <td>{loandata?.name}</td>
                                            <td>{loandata?.amount}</td>
                                            <td>{loandata?.duration}</td>
                                            <td>{loandata?.status}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-9">
                            <div className="container-fluid">
                                <h4 className='btn btn-primary w-100 text-light text-center'>Repayment Section </h4>
                                <div className="row mt-3">
                                    {loandata?.status === "Paid" ? <>  {loandata?.installment?.map((item) => (
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
                                                    {item.paid ? null : <>                                                    <button className='btn btn-primary text-light mt-2'>Pay</button>
                                                    </>}
                                                </div>
                                            </div>
                                        </div>
                                    ))}</> : <><div className='text-danger text-center mb-3'><strong>No Repayments Are Available!</strong></div></>}
                                </div>
                            </div>
                        </div>
                    </div></> : null}
            </div>
        </>
    )
}
