import React, { useEffect, useState } from 'react'
import Sidebar from "../../../Components/Sidebar"
import Breadcrum from "../../../Components/Breadcrum"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Deleteusers, Getusers } from "../../../Redux/ActionCreator/Usersactioncreator"


export default function User() {
    let dispatch = useDispatch()
    let usersStatedata = useSelector(state => state.usersStatedata)
    let [data, setdata] = useState([]);

    function deletetestimonial(id) {
        if (window.confirm("Do you want to delete")) {
            let item = usersStatedata.find(x => x._id === id)
            if (item) {
                dispatch(Deleteusers(item))
            }
        }
    }
    useEffect(() => {
        dispatch(Getusers())
    }, [])

    useEffect(() => {
        setdata(usersStatedata)
    }, [usersStatedata])

    return (
        <>
            <div className="container-fluid">
                <Breadcrum title="Users Page" />
                <div className="row mt-3">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h4 className='btn btn-primary text-light text-center w-100'>Users Section <Link to="/admin/user/create"><i className='fa fa-plus text-light float-end fs-5'></i></Link></h4>
                        <div className="table-resposive mt-3">
                            <table className='table table-bordered table-striped table-hover text-center'>
                                <thead >
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Username</th>
                                        <th>Role</th>
                                        <th>Active</th>
                                        <th>Edit</th>
                                        {localStorage.getItem("role") === "Super Admin" ? <><th>Delete</th></> : null}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((item, index) => {
                                            return <tr key={index}>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.username}</td>
                                                <td>{item.role}</td>
                                                <td>{item.active === true ? "Yes" : "NO"}</td>
                                                <td><Link to={`/admin/user/update/${item._id}`}><button className='btn btn-primary'><i className='fa fa-edit text-light'></i></button></Link></td>
                                                {localStorage.getItem("role") === "Super Admin" ? <>                                                <td><button className='btn btn-danger' onClick={() => { deletetestimonial(item._id) }}><i className='fa fa-trash text-light'></i></button></td>
                                                </> : null}
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
