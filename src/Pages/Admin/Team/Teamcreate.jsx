import React, { useEffect, useState } from 'react'
import Sidebar from '../../../Components/Sidebar'
import Breadcrum from '../../../Components/Breadcrum'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import Filevalidator from "../../../Validator/Filevalidator"
import Formvalidator from '../../../Validator/Formvalidator';
import { Createteam, Getteam } from "../../../Redux/ActionCreator/Teamactioncreator"

export default function Teamcreate() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let teamStatedata = useSelector(state => state.teamStatedata);
  let [data, setdata] = useState({
    name: "",
    work: "",
    pic: "",
    active: "",
    discription: ""
  })
  let [errormessage, seterrormessage] = useState({
    name: "Feild is Mandatory",
    work: "Feild is Mandatory",
    pic: "Feild is Mandatory",
    active: "Feild is Mandatory",
    discription: "Feild is Mandatory"
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
      let item = teamStatedata.find(x => x.name === data.name)
      if (item) {
        seterrormessage((old) => {
          return {
            ...old,
            'name': 'Same Name Team already exist'
          }
        })
        return
      }
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      dispatch(Createteam(formData))
      navigate("/admin/team");
    }
  }

  useEffect(() => {
    dispatch(Getteam());
  }, [teamStatedata])
  return (
    <>
      <Breadcrum title="Team Page" />
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <h4 className='btn btn-primary w-100'>
              Team Create
              <Link to="/admin/team">
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
                  <label>Work*</label>
                  <input type="text" name="work" onChange={inputdata} className={`form-control border-3 ${show && errormessage.work ? 'border-danger' : "border-primary"}`} placeholder='Enter work' />
                  {show && errormessage.work ? <p className='text-danger'>{errormessage.work}</p> : null}
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
                  <label >Discription*</label>
                  <textarea name="discription" rows={4} placeholder='Enter discription about loan....' className={`form-control border-3 ${show && errormessage.discription ? "border-danger" : "border-primary"}`} onChange={inputdata}></textarea>
                  {show && errormessage.discription ? <p className='text-danger'>{show && errormessage.discription}</p> : null}
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
