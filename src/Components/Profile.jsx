import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Profile({ title }) {

    let [data, setdata] = useState([]);

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
            </div>
        </>
    )
}
