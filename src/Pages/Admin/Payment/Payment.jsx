import React, { useEffect, useState } from 'react'
import Sidebar from "../../../Components/Sidebar"
import Breadcrum from '../../../Components/Breadcrum'
import { Link, useNavigate } from 'react-router-dom'

// for data tables 
import 'datatables.net-dt/css/dataTables.dataTables.css';
import $, { data } from 'jquery';
import 'datatables.net-dt';

import { Getloan, Updateloan } from "../../../Redux/ActionCreator/Loanactioncreator"
import { useDispatch, useSelector } from 'react-redux';


export default function Payment() {
    let dispatch = useDispatch()
    let navigate = useNavigate();
    let loanStatedata = useSelector(state => state.loanStatedata);
    function getapi() {
        dispatch(Getloan());
    }

    function laoninstallment(id) {
        let item = loanStatedata.find(x => x.id === id);
        const installment = [];
        let startdate = new Date(item.date);
        let duration = parseInt(item.duration);

        for (let i = 1; i <= duration; i++) {
            const duedate = new Date(startdate);
            duedate.setMonth(duedate.getMonth() + i);

            installment.push({
                month: i,
                duedate: duedate.toLocaleString(),
                paid: false,
                paidat: null
            })
        }
        return installment;
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


    //function for pay the loan
    function payloan(id) {
        if (window.confirm("Do you want to pay loan")) {
            let item = loanStatedata.find(x => x.id === id)
            dispatch(Updateloan({ ...item, status: "paid", date: new Date(), installment: laoninstallment(id) }))
        }
    }

    //function for reject the loan
    function rejectloan(id) {
        if (window.confirm("Do you want to reject loan")) {
            let item = loanStatedata.find(x => x.id === id)
            dispatch(Updateloan({ ...item, status: "rejected", date: new Date(), }))
        }
    }
    return (
        <>
            <Breadcrum title="Admin --> Loan Payment Section" />
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h4 className='btn btn-primary w-100'>Loan Payment Section</h4>
                        <div className="table-responsive">
                            <table id='myTable' className='display table table-striped table-bordered'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Mobile</th>
                                        <th>Aadhar</th>
                                        <th>Amount</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Pay Loan</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loanStatedata.filter(x => x.status === "Approved").map((item, index) => {
                                        return <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.mobile}</td>
                                            <td>{item.aadhar}</td>
                                            <td>{item.amount}</td>
                                            <td>{new Date(item.date).toLocaleString()}</td>
                                            <td>{item.status}</td>
                                            <td><button className='btn btn-primary' onClick={() => { payloan(item.id) }}><i className='fa fa-credit-card text-light'></i></button></td>
                                            <td><button className='btn btn-danger' onClick={() => { rejectloan(item.id) }}><i className='fa fa-trash text-light'></i></button></td>
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
