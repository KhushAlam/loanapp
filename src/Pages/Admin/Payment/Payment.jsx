import React, { useEffect, useState } from 'react'
import Sidebar from "../../../Components/Sidebar"
import Breadcrum from '../../../Components/Breadcrum'
import { Link, useNavigate } from 'react-router-dom'
import Rezerpay from "../../../Components/Rezerpay"

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
        let item = loanStatedata.find(x => x._id === id);
        const installment = [];
        let startdate = new Date(item.date);
        let duration = parseInt(item.duration);

        for (let i = 1; i <= duration; i++) {
            const duedate = new Date(startdate);
            duedate.setMonth(duedate.getMonth() + i);

            installment.push({
                month: i,
                duedate,        // direct Date object bhejna
                paid: false,
                paidat: null
            });
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
        let item = loanStatedata.find(x => x._id === id);
        if (item) {
            const updateddata = {
                ...item,
                status: "Paid",   // backend schema me enum "Paid" hai, small letters nahi
                date: new Date(),
                installment: laoninstallment(id)
            };

            const Formdata = new FormData();
            Object.keys(updateddata).forEach((key) => {
                if (key === "installment") {
                    // installment array ko JSON string me convert karke bhejna hoga
                    Formdata.append(key, JSON.stringify(updateddata[key]));
                } else {
                    Formdata.append(key, updateddata[key]);
                }
            });

            dispatch(Updateloan(Formdata));
        }
    }

    //function for reject the loan
    function rejectloan(id) {
        if (window.confirm("Do you want to reject loan")) {
            let item = loanStatedata.find(x => x.id === id)

            const updateddata = {
                ...item,
                status: "Rejected",
                date: new Date(),
            }

            const Fromdata = new FormData
            Object.keys(updateddata).forEach((key) => {
                Fromdata.append(key, updateddata[key]);
            })
            dispatch(Updateloan(Fromdata));
        }
    }
    let notes = {};
    //rezerpaypayment intigration 
    const [loading, setLoading] = useState(false);

    const handlePayment = async (id, amountInRupees) => {
        setLoading(true);
        const ok = await Rezerpay();
        if (!ok) {
            alert("Razorpay SDK load failed. Check internet.");
            setLoading(false);
            return;
        }
        try {
            // 1) Create order on your backend
            const res = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}api/payments/create-order`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amountInRupees, notes })
            });
            const order = await res.json();
            if (!order || !order.id) throw new Error("Order creation failed");

            // 2) Open Razorpay Checkout
            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "Loan application",
                description: "Loan Payment",
                image: "/logo192.png",
                order_id: order.id,
                prefill: { name: "", email: "", contact: "" },
                notes: order.notes || {},
                handler: async function (response) {
                    const verifyRes = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}api/payments/verify`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(response)
                    });
                    const verifyJson = await verifyRes.json();
                    if (verifyJson.success) {
                        payloan(id);
                    } else {
                        alert("Payment verification failed ❌");
                    }
                },
                method: {
                    netbanking: true,
                    card: true,
                    upi: true,
                    wallet: true
                },
                modal: { ondismiss: function () { } }
            };

            const rzp = new window.Razorpay(options);
            rzp.on("payment.failed", function (resp) {
                console.error("Payment failed:", resp.error);
                alert("Payment failed");
            });
            rzp.open();

        } catch (err) {
            console.error(err);
            alert("Payment start failed");
        } finally {
            setLoading(false);
        }
    };


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
                                            <td><button className='btn btn-primary' onClick={() => { handlePayment(item._id, item.amount) }} disabled={loading}>{loading ? "Processing..." : `Pay ₹${item.amount}`}</button></td>
                                            <td><button className='btn btn-danger' onClick={() => { rejectloan(item._id) }}><i className='fa fa-trash text-light'></i></button></td>
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
