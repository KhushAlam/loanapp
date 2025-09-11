import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Getloan } from "../Redux/ActionCreator/Loanactioncreator";
import { useDispatch, useSelector } from "react-redux";
import Rezerpay from "../Components/Rezerpay";

export default function Profile({ title }) {
    const dispatch = useDispatch();
    const loanStatedata = useSelector((state) => state.loanStatedata);
    const [data, setData] = useState({});
    const [loandata, setLoandata] = useState(null);
    const [loadingId, setLoadingId] = useState(null); // <-- sirf ek button ka id store karega
    const navigate = useNavigate();
    const notes = {};

    async function payloan(installmentId, loanId) {
        const item = loanStatedata.find((x) => x._id === loanId);
        if (!item) return;

        const loan = item.installment.find((x) => x._id === installmentId);
        const updatedata = { ...loan, paid: true };

        const formData = new FormData();
        Object.keys(updatedata).forEach((key) => {
            formData.append(key, updatedata[key]);
        });

        try {
            const response = await fetch(
                `${process.env.REACT_APP_BACKEND_SERVER}loan/${loanId}/installment/${installmentId}`,
                {
                    method: "PUT",
                    body: formData,
                }
            );

            const result = await response.json();
            if (result.success) {
                navigate("/profile");
            } else {
                alert("Failed to update installment");
            }
        } catch (err) {
            console.error("Payloan error:", err);
            alert("Something went wrong");
        }
    }

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(
                    `${process.env.REACT_APP_BACKEND_SERVER}user/get/${localStorage.getItem(
                        "userid"
                    )}`,
                    {
                        method: "GET",
                        headers: { "Content-type": "application/json" },
                    }
                );

                const json = await res.json();
                if (json?.data) setData(json.data);
            } catch (err) {
                console.error("User fetch error:", err);
            }
        })();
    }, []);

    useEffect(() => {
        dispatch(Getloan());
    }, [dispatch]);

    useEffect(() => {
        if (loanStatedata?.length) {
            setLoandata(
                loanStatedata.find(
                    (x) => x.userid === localStorage.getItem("userid")
                )
            );
        }
    }, [loanStatedata]);

    const handlePayment = async (id, amountInRupees, loanid) => {
        setLoadingId(id); // <-- sirf isi button pe loading
        const ok = await Rezerpay();
        if (!ok) {
            alert("Razorpay SDK load failed. Check internet.");
            setLoadingId(null);
            return;
        }

        try {
            const res = await fetch(
                `${process.env.REACT_APP_BACKEND_SERVER}api/payments/create-order`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ amountInRupees, notes }),
                }
            );

            const order = await res.json();
            if (!order || !order.id) throw new Error("Order creation failed");

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
                    const verifyRes = await fetch(
                        `${process.env.REACT_APP_BACKEND_SERVER}api/payments/verify`,
                        {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(response),
                        }
                    );

                    const verifyJson = await verifyRes.json();
                    if (verifyJson.success) {
                        payloan(id, loanid);
                    } else {
                        alert("Payment verification failed");
                    }
                },
                method: { netbanking: true, card: true, upi: true, wallet: true },
                modal: { ondismiss: () => { } },
            };

            const rzp = new window.Razorpay(options);
            rzp.on("payment.failed", (resp) => {
                console.error("Payment failed:", resp.error);
                alert("Payment failed");
            });
            rzp.open();
        } catch (err) {
            console.error("Payment start failed:", err);
            alert("Payment start failed");
        } finally {
            setLoadingId(null); // <-- reset
        }
    };

    return (
        <>
            <h4 className="btn btn-primary text-light text-center w-100 mt-2">
                {title}
            </h4>
            <div className="container-fluid">
                {/* Profile Section */}
                <div className="row mt-4">
                    <div className="col-12 col-md-6 mb-3">
                        <div className="pic mt-2" style={{ width: "100%", maxWidth: 400 }}>
                            <img
                                src={data?.pic || "/assets/img/team/download.png"}
                                alt="Profile"
                                height={400}
                                width="100%"
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-6 mt-3">
                        <div className="table-responsive">
                            <table className="table table-bordered table-striped w-100">
                                <tbody>
                                    <tr><th>Name</th><td>{data.name}</td></tr>
                                    <tr><th>Username</th><td>{data.username}</td></tr>
                                    <tr><th>Email</th><td>{data.email}</td></tr>
                                    <tr><th>Phone</th><td>{data.mobile}</td></tr>
                                    <tr><th>Active</th><td>{data.active ? "Yes" : "No"}</td></tr>
                                    <tr><th>Role</th><td>{data.role}</td></tr>
                                    <tr><th>Address</th><td>{data.address}</td></tr>
                                    <tr>
                                        <th colSpan={2}>
                                            <Link
                                                to={`/update/${data._id}`}
                                                className="btn btn-primary w-100 text-light text-center"
                                            >
                                                Update Profile
                                            </Link>
                                        </th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Loan + Installments */}
                {localStorage.getItem("role") === "User" && (
                    <>
                        <div className="row">
                            <div className="col-md-3"></div>
                            <div className="col-md-9">
                                <h4 className="btn btn-primary text-light text-center w-100">
                                    Applied Loan Details and Status/History
                                </h4>
                                {loandata?.status === "Paid" ? (
                                    <div className="table-responsive mt-5">
                                        <table className="table table-bordered table-striped table-hover">
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
                                ) : (
                                    <p className="text-danger mt-3 text-center">
                                        <strong>No Loans Are Available</strong>
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Repayment Section */}
                        <div className="row">
                            <div className="col-md-3"></div>
                            <div className="col-md-9">
                                <div className="container-fluid">
                                    <h4 className="btn btn-primary w-100 text-light text-center">
                                        Repayment Section
                                    </h4>
                                    <div className="row mt-3">
                                        {loandata?.status === "Paid" ? (
                                            loandata?.installment?.map((item) => (
                                                <div key={item._id} className="col-md-3 mb-3">
                                                    <div className="card shadow-sm h-100 border-0 rounded-3">
                                                        <div className="card-body text-center">
                                                            <h5 className="card-title fw-bold">
                                                                Month {item.month}
                                                            </h5>
                                                            <p className="card-text mb-1">
                                                                <strong>Due:</strong>{" "}
                                                                {new Date(item.duedate).toLocaleDateString()}
                                                            </p>
                                                            <span
                                                                className={`badge ${item.paid
                                                                        ? "bg-success"
                                                                        : "bg-warning text-dark"
                                                                    }`}
                                                            >
                                                                {item.paid ? "Paid" : "Pending"}
                                                            </span>
                                                            <br />
                                                            {!item.paid && (
                                                                <button
                                                                    className="btn btn-primary mt-1"
                                                                    onClick={() =>
                                                                        handlePayment(item._id, 488, loandata._id)
                                                                    }
                                                                    disabled={loadingId === item._id}
                                                                >
                                                                    {loadingId === item._id
                                                                        ? "Processing..."
                                                                        : `Pay ₹${488}`}
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-danger text-center mb-3">
                                                <strong>No Repayments Are Available!</strong>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
