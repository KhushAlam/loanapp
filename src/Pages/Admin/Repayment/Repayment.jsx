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

export default function Repayment() {
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

  return (
    <>
      <Breadcrum title="Admin --> Loan Repayment Section" />
      <div className="container-fluid">
        <div className="row mt-3 mb-3">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <h4 className='btn btn-primary w-100'>Loan Repayment Section</h4>
            <div className="table-responsive">
              <table id='myTable' className='display table table-striped table-bordered'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Aadhar</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Duration</th>
                    <th>Status</th>
                    <th>Pay Loan</th>
                  </tr>
                </thead>
                <tbody>
                  {loanStatedata.filter(x => x.status === "Paid").map((item, index) => {
                    return <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.aadhar}</td>
                      <td>{item.amount}</td>
                      <td>{new Date(item.date).toLocaleDateString()}</td>
                      <td>{item.duration}</td>
                      <td>{item.status}</td>
                      <td><button className='btn btn-primary'><i className='fa fa-eye text-light'></i></button></td>
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
