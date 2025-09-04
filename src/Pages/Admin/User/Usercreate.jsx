import React, { useEffect, useState } from 'react'
import Sidebar from '../../../Components/Sidebar'
import Breadcrum from '../../../Components/Breadcrum'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import Filevalidator from "../../../Validator/Filevalidator"
import Formvalidator from '../../../Validator/Formvalidator';
import { Createusers, Getusers } from "../../../Redux/ActionCreator/Usersactioncreator"

export default function Usercreate() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let usersStatedata = useSelector(state => state.usersStatedata);
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
    name: "Feild is Mandatory",
    username: "Feild is Mandatory",
    mobile: "Feild is Mandatory",
    email: "Feild is Mandatory",
    password: "Feild is Mandatory",
    role: "Feild is Mandatory",
    pic: "Feild is Mandatory",
    active: "Feild is Mandatory",
    address: "Feild is Mandatory"
  })
  let [show, setshow] = useState(false)

  function inputdata(e) {
    let name = e.target.name;
    let value = e.target.files && e.target.files.length ? e.target.files[0] : e.target.value;

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
      let item = usersStatedata.find(x => (x.email === data.email) || (x.username === data.username))
      if (item) {
        seterrormessage((old) => {
          return {
            ...old,
            'username': 'Same Email/Username already exist',
            'email': "Same Email/Username already exist"
          }
        })
        return
      }

      const Fromdata = new FormData;
      Object.keys(data).forEach(element => {
        Fromdata.append(element, data[element])
      });

      dispatch(Createusers(Fromdata));
      navigate("/admin/user");
    }
  }
  useEffect(() => {
    dispatch(Getusers());
  }, [])
  return (
    <>
      <div className="container-fluid">
        <Breadcrum title="User Page" />
        <div className="row mt-3">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <h4 className='btn btn-primary w-100'>
              User Create
              <Link to="/admin/User">
                <span><i className='fa fa-arrow-left float-end text-light fs-5'></i></span>
              </Link>
            </h4>
            <form onSubmit={postdata}>
              <div className="row mt-3">
                {/* Name */}
                <div className='col-md-6 mb-3'>
                  <label>Name*</label>
                  <input type="text" name="name" onChange={inputdata} className={`form-control border-3 ${show && errormessage.name ? 'border-danger' : "border-primary"}`} placeholder='Enter Name' />
                  {show && errormessage.name ? <p className='text-danger'>{errormessage.name}</p> : null}
                </div>
                <div className='col-md-6 mb-3'>
                  <label>Username*</label>
                  <input type="text" name="username" onChange={inputdata} className={`form-control border-3 ${show && errormessage.username ? 'border-danger' : "border-primary"}`} placeholder='Enter username' />
                  {show && errormessage.username ? <p className='text-danger'>{errormessage.username}</p> : null}
                </div>
                <div className='col-md-6 mb-3'>
                  <label>Mobile*</label>
                  <input type="number" name="mobile" onChange={inputdata} className={`form-control border-3 ${show && errormessage.mobile ? 'border-danger' : "border-primary"}`} placeholder='Enter mobile' />
                  {show && errormessage.mobile ? <p className='text-danger'>{errormessage.mobile}</p> : null}
                </div>
                <div className='col-md-6 mb-3'>
                  <label>Email*</label>
                  <input type="email" name="email" onChange={inputdata} className={`form-control border-3 ${show && errormessage.email ? 'border-danger' : "border-primary"}`} placeholder='Enter email' />
                  {show && errormessage.email ? <p className='text-danger'>{errormessage.email}</p> : null}
                </div>
                <div className='col-md-6 mb-3'>
                  <label>Password*</label>
                  <input type="password" name="password" onChange={inputdata} className={`form-control border-3 ${show && errormessage.password ? 'border-danger' : "border-primary"}`} placeholder='Enter password' />
                  {show && errormessage.password ? <p className='text-danger'>{errormessage.password}</p> : null}
                </div>
                <div className='col-md-6 mb-3'>
                  <label>Role*</label>
                  <select name="role" onChange={inputdata} className={`form-control form-select border-3 ${show && errormessage.role ? "border-danger" : 'border-primary'}`}>
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
                  <textarea name="address" rows={4} placeholder='Enter address of user....' className={`form-control border-3 ${show && errormessage.address ? "border-danger" : "border-primary"}`} onChange={inputdata}></textarea>
                  {show && errormessage.address ? <p className='text-danger'>{show && errormessage.address}</p> : null}
                </div>
                {/* Submit */}
                <div className="col-md-12 mb-3">
                  <button type="submit" className='form-control btn btn-primary w-100'>Create</button>
                </div>
              </div>
            </form>
          </div>

        </div>
      </div>
    </>
  )
}
