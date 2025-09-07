import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Formvalidator from '../Validator/Formvalidator';
import Filevalidator from '../Validator/Filevalidator';
import { Getusers, Updateusers } from "../Redux/ActionCreator/Usersactioncreator"

export default function Updateprofile() {
    let { id } = useParams()
    let dispatch = useDispatch();
    let navigate = useNavigate();

    let [data, setdata] = useState({
        name: "",
        username: "",
        mobile: "",
        email: "",
        password: "",
        role: "",
        pic: "",
        active: "",
        address: ""
    })
    let [errormessage, seterrormessage] = useState({
        name: "",
        username: "",
        mobile: "",
        email: "",
        password: "",
        role: "",
        pic: "",
        active: "",
        address: ""
    })
    let [show, setshow] = useState(false)

    function inputdata(e) {
        let name = e.target.name;
        let value = e.target.files && e.target.files.length ? e.target.files[0] : e.target.value;

        let error = e.target.files ? Filevalidator(e) : Formvalidator(e)

        seterrormessage((old) => ({
            ...old,
            [name]: error
        }))

        setdata((old) => ({
            ...old,
            [name]: value
        }))
    }

    async function postdata(e) {
        e.preventDefault();
        let error = Object.values(errormessage).find(x => x !== "");
        if (error) {
            setshow(true);
        } else {
            const Formdata = new FormData();
            Object.keys(data).forEach(element => {
                if (element === "pic") {
                    if (data.pic instanceof File) {
                        Formdata.append("pic", data.pic);
                    }
                } else {
                    Formdata.append(element, data[element]);
                }
            });

            let respone = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}user/update/${id}`, {
                method: "PUT",
                body: Formdata
            })
            respone = await respone.json();
            localStorage.getItem("role") === "User" ? navigate("/profile") : navigate("/admin")
        }
    }

    useEffect(() => {
        (async () => {
            let responce = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}user/get/${id}`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                },
            })

            responce = await responce.json();
            if (responce) {
                setdata(responce.data);
            }
        })()
    }, [])
    return (
        <div className="container-fluid">
            <div className="row mt-3">
                <div className="col-md-3">
                    <Sidebar />
                </div>
                <div className="col-md-9">
                    <h4 className='btn btn-primary w-100 text-light text-center'>
                        Update Your Profile
                        <Link to="/admin">
                            <span><i className='fa fa-arrow-left float-end text-light fs-5'></i></span>
                        </Link>
                    </h4>
                    <form onSubmit={postdata}>
                        <div className="row mt-3">
                            {/* Name */}
                            <div className='col-md-6 mb-3'>
                                <label>Name*</label>
                                <input type="text" name="name" value={data.name} onChange={inputdata}
                                    className={`form-control border-3 ${show && errormessage.name ? 'border-danger' : "border-primary"}`}
                                    placeholder='Enter Name' />
                                {show && errormessage.name && <p className='text-danger'>{errormessage.name}</p>}
                            </div>

                            <div className='col-md-6 mb-3'>
                                <label>Username*</label>
                                <input type="text" name="username" value={data.username} onChange={inputdata}
                                    className={`form-control border-3 ${show && errormessage.username ? 'border-danger' : "border-primary"}`}
                                    placeholder='Enter username' />
                                {show && errormessage.username && <p className='text-danger'>{errormessage.username}</p>}
                            </div>

                            <div className='col-md-6 mb-3'>
                                <label>Mobile*</label>
                                <input type="number" name="mobile" value={data.mobile} onChange={inputdata}
                                    className={`form-control border-3 ${show && errormessage.mobile ? 'border-danger' : "border-primary"}`}
                                    placeholder='Enter mobile' />
                                {show && errormessage.mobile && <p className='text-danger'>{errormessage.mobile}</p>}
                            </div>

                            <div className='col-md-6 mb-3'>
                                <label>Email*</label>
                                <input type="email" name="email" value={data.email} onChange={inputdata}
                                    className={`form-control border-3 ${show && errormessage.email ? 'border-danger' : "border-primary"}`}
                                    placeholder='Enter email' />
                                {show && errormessage.email && <p className='text-danger'>{errormessage.email}</p>}
                            </div>

                            <div className='col-md-6 mb-3'>
                                <label>Password*</label>
                                <input type="password" name="password" value={data.password} onChange={inputdata}
                                    className={`form-control border-3 ${show && errormessage.password ? 'border-danger' : "border-primary"}`}
                                    placeholder='Enter password' />
                                {show && errormessage.password && <p className='text-danger'>{errormessage.password}</p>}
                            </div>
                            <div className='col-md-6 mb-3'>
                                <label>Pic*</label>
                                <input type='file' name="pic" onChange={inputdata}
                                    className={`form-control border-3 ${show && errormessage.pic ? 'border-danger' : "border-primary"}`} />
                                {show && errormessage.pic && <p className='text-danger'>{errormessage.pic}</p>}
                            </div>

                            <div className='col-md-12 mb-3'>
                                <label>Address*</label>
                                <textarea name="address" rows={4} value={data.address} placeholder='Enter address of user....'
                                    className={`form-control border-3 ${show && errormessage.address ? "border-danger" : "border-primary"}`} onChange={inputdata}></textarea>
                                {show && errormessage.address && <p className='text-danger'>{errormessage.address}</p>}
                            </div>

                            {/* Submit */}
                            <div className="col-md-12 mb-3">
                                <button type="submit" className='form-control btn btn-primary w-100'>Update</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
