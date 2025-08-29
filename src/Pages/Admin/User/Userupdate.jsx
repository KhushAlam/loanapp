import React, { useEffect, useState } from 'react'
import Sidebar from '../../../Components/Sidebar'
import Breadcrum from '../../../Components/Breadcrum'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Filevalidator from "../../../Validator/Filevalidator"
import Formvalidator from '../../../Validator/Formvalidator';
import { Getusers, Updateusers } from "../../../Redux/ActionCreator/Usersactioncreator"

export default function Userupdate() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let { id } = useParams();
  let usersStatedata = useSelector(state => state.usersStatedata);
   let [data, setdata] = useState({
      name: "",
      username: "",
      mobile:"",
      email:"",
      password:"",
      role:"",
      pic: "",
      active: "",
      address: ""
    })
    let [errormessage, seterrormessage] = useState({
      name: "",
      username: "",
      mobile:"",
      email:"",
      password:"",
      role:"",
      pic: "",
      active: "",
      address: ""
    })
  let [show, setshow] = useState(false)

  function inputdata(e) {
    let name = e.target.name;
    let value = e.target.files && e.target.files.length ? "user/" + e.target.files[0].name : e.target.value;

    let error = e.target.files ? Filevalidator(e) : Formvalidator(e)

    seterrormessage((old) => {
      return {
        ...old,
        [name]: error
      }
    })

    setdata((old) => {
      return {
        ...old,
        [name]: value
      }
    })
  }
  function postdata(e) {
    e.preventDefault();
    let error = Object.values(errormessage).find(x => x !== "");
    if (error) {
      setshow(true);
    } else {
      dispatch(Updateusers({ ...data }))
      navigate("/admin/user");
    }
  }
  useEffect(() => {
    dispatch(Getusers());
    if (usersStatedata.length) {
      setdata(usersStatedata.find(x => x.id === id));
    }
  }, [usersStatedata.length, id])
  return (
    <>
      <div className="container-fluid">
        <Breadcrum title="Users Create Page" />
        <div className="row mt-3">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <h4 className='btn btn-primary w-100'>
              User Update
              <Link to="/admin/user">
                <span><i className='fa fa-arrow-left float-end text-light fs-5'></i></span>
              </Link>
            </h4>
             <form onSubmit={postdata}>
              <div className="row mt-3">
                {/* Name */}
                <div className='col-md-6 mb-3'>
                  <label>Name*</label>
                  <input type="text" name="name" value={data.name} onChange={inputdata} className={`form-control border-3 ${show && errormessage.name ? 'border-danger' : "border-primary"}`} placeholder='Enter Name' />
                  {show && errormessage.name ? <p className='text-danger'>{errormessage.name}</p> : null}
                </div>
                <div className='col-md-6 mb-3'>
                  <label>Username*</label>
                  <input type="text" name="username" value={data.username} onChange={inputdata} className={`form-control border-3 ${show && errormessage.username ? 'border-danger' : "border-primary"}`} placeholder='Enter username' />
                  {show && errormessage.username ? <p className='text-danger'>{errormessage.username}</p> : null}
                </div>
                <div className='col-md-6 mb-3'>
                  <label>Mobile*</label>
                  <input type="number" name="mobile" value={data.mobile} onChange={inputdata} className={`form-control border-3 ${show && errormessage.mobile ? 'border-danger' : "border-primary"}`} placeholder='Enter mobile' />
                  {show && errormessage.mobile ? <p className='text-danger'>{errormessage.mobile}</p> : null}
                </div>
                <div className='col-md-6 mb-3'>
                  <label>Email*</label>
                  <input type="email" name="email" value={data.email} onChange={inputdata} className={`form-control border-3 ${show && errormessage.email ? 'border-danger' : "border-primary"}`} placeholder='Enter email' />
                  {show && errormessage.email ? <p className='text-danger'>{errormessage.email}</p> : null}
                </div>
                <div className='col-md-6 mb-3'>
                  <label>Password*</label>
                  <input type="text" name="password" onChange={inputdata} className={`form-control border-3 ${show && errormessage.password ? 'border-danger' : "border-primary"}`} placeholder='Enter password' />
                  {show && errormessage.password ? <p className='text-danger'>{errormessage.password}</p> : null}
                </div>
                <div className='col-md-6 mb-3'>
                  <label>Role*</label>
                  <select name="role" onChange={inputdata} className={`form-control form-select border-3 ${show&&errormessage.role?"border-danger":'border-primary'}`}>
                    <option value="">Select Role</option>
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                    <option value="Super Admin">Super Admin</option>
                  </select>
                  {show && errormessage.role ? <p className='text-danger'>{errormessage.role}</p> : null}
                </div>
                <div className='col-md-6 mb-3'>
                  <label>Pic*</label>
                  <input type='file' name="pic" onChange={inputdata} className={`form-control border-3 ${show && errormessage.pic ? 'border-danger' : "border-primary"}`} placeholder='Enter pic' />
                  {show && errormessage.pic ? <p className='text-danger'>{errormessage.pic}</p> : null}
                </div>
                <div className='col-md-6 mb-3'>
                  <label>Active*</label>
                  <select name="active" className='form-control form-select border-3 border-primary' onChange={inputdata}>
                    <option value="">Select Active</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                  {show && errormessage.active ? <p className='text-danger'>{errormessage.name}</p> : null}

                </div>
                <div className='col-md-12 mb-3'>
                  <label >Address*</label>
                  <textarea name="address" rows={4} value={data.address} placeholder='Enter address of user....' className={`form-control border-3 ${show && errormessage.address ? "border-danger" : "border-primary"}`} onChange={inputdata}></textarea>
                  {show && errormessage.address ? <p className='text-danger'>{show && errormessage.address}</p> : null}
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
    </>
  )
}
