import React, { useEffect } from 'react'
import Sidebar from "../../../Components/Sidebar"
import Breadcrum from '../../../Components/Breadcrum'
import { Link, useNavigate } from 'react-router-dom'

// for data tables 
import 'datatables.net-dt/css/dataTables.dataTables.css';
import $ from 'jquery';
import 'datatables.net-dt';

import { Deleteloan, Getloan } from "../../../Redux/ActionCreator/Loanactioncreator"
import { useDispatch, useSelector } from 'react-redux';


export default function Loanapplication() {
    let dispatch = useDispatch()
    let navigate = useNavigate();
    let loanStatedata = useSelector(state => state.loanStatedata);

    function getapi() {
        dispatch(Getloan());
    }

    useEffect(() => {
        getapi();

        const time = setTimeout(() => {
            $('#myTable').DataTable();
        }, 300);

        return () => clearTimeout(time); // ✅ cleanup function
    }, []);

    useEffect(() => {
        // Agar DataTable already init ho chuka hai to dobara init mat karo
        if (!$.fn.DataTable.isDataTable("#myTable")) {
            $('#myTable').DataTable({
                retrieve: true, // Dobara init se bachega
                destroy: true,  // Component unmount pe destroy hoga
                ordering: false,
                paging: true
            });
        }
    }, []);

    function deleteapplication(id) {
        if (!loanStatedata || loanStatedata.length === 0) return;
        let item = loanStatedata.find((x) => x._id === id)
        if (item) {
            if (window.confirm("Do you want to delete this Appication"))
                dispatch(Deleteloan(item));
        }
    }

    return (
        <>
            <Breadcrum title="Admin --> Loan Application" />
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h4 className='btn btn-primary w-100'>Loan Applications<Link to="/admin/loanapplication/create"><i className='fa fa-plus float-end text-light fs-5'></i></Link></h4>
                        <div className="table-responsive">
                            <table id='myTable' className='display table table-striped table-bordered'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Mobile</th>
                                        <th>Aadhar</th>
                                        <th>Email</th>
                                        <th>Amount</th>
                                        <th>Data</th>
                                        <th>Show</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loanStatedata.filter((x) => x.status === "Submited").map((item, index) => {
                                        return <tr key={index}>
                                            <td>{item._id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.mobile}</td>
                                            <td>{item.aadhar}</td>
                                            <td>{item.email}</td>
                                            <td>{item.amount}</td>
                                            <td>{new Date(item.date).toLocaleString()}</td>
                                            <td><Link to={`/admin/loanapplication/show/${item._id}`}><button className='btn btn-primary'><i className='fa fa-eye text-light'></i></button></Link></td>
                                            <td><Link to={`/admin/loanapplication/update/${item._id}`}><button className='btn btn-primary'><i className='fa fa-edit text-light'></i></button></Link></td>
                                            {localStorage.getItem("role") === "Super Admin" ? <td><button className='btn btn-danger' onClick={() => { deleteapplication(item._id) }}><i className='fa fa-trash text-light'></i></button></td>  : null}
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
