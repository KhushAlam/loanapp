import React, { useEffect, useState } from 'react'
import Sidebar from '../../../Components/Sidebar'
import Breadcrum from '../../../Components/Breadcrum'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Filevalidator from "../../../Validator/Filevalidator"
import Formvalidator from '../../../Validator/Formvalidator';
import { Gettestimonial, Updatetestimonial } from "../../../Redux/ActionCreator/Testimonialactioncreator"

export default function Testimonialupdate() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let { id } = useParams();
  let testimonialStatedata = useSelector(state => state.testimonialStatedata);
  let [data, setdata] = useState({
    name: "",
    city: "",
    pic: "",
    active: "",
    discription: ""
  })
  let [errormessage, seterrormessage] = useState({
    name: "",
    city: "",
    pic: "",
    active: "",
    discription: ""
  })
  let [show, setshow] = useState(false)

  function inputdata(e) {
    let name = e.target.name;
    let value = e.target.files && e.target.files.length ? "testimonial/" + e.target.files[0].name : e.target.value;

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
      dispatch(Updatetestimonial({ ...data }))
      navigate("/admin/testimonial");
    }
  }
  useEffect(() => {
    dispatch(Gettestimonial());
    if (testimonialStatedata.length) {
      setdata(testimonialStatedata.find(x => x.id === id));
    }
  }, [testimonialStatedata.length, id])
  return (
    <>
      <div className="container-fluid">
        <Breadcrum title="Testimonial Page" />
        <div className="row mt-3">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <h4 className='btn btn-primary w-100'>
              Testimonial Update
              <Link to="/admin/testimonial">
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
                  <label>City*</label>
                  <input type="text" name="city" value={data.city} onChange={inputdata} className={`form-control border-3 ${show && errormessage.city ? 'border-danger' : "border-primary"}`} placeholder='Enter city' />
                  {show && errormessage.city ? <p className='text-danger'>{errormessage.city}</p> : null}
                </div>
                <div className='col-md-6 mb-3'>
                  <label>Pic*</label>
                  <input type='file' name="pic" onChange={inputdata} className={`form-control border-3 ${show && errormessage.pic ? 'border-danger' : "border-primary"}`} placeholder='Enter pic' />
                  {show && errormessage.pic ? <p className='text-danger'>{errormessage.pic}</p> : null}
                </div>
                <div className='col-md-6 mb-3'>
                  <label>Active*</label>
                  <select name="active" value={data.active} className='form-control form-select border-3 border-primary' onChange={inputdata}>
                    <option value="">Select Active</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                  {show && errormessage.active ? <p className='text-danger'>{errormessage.name}</p> : null}

                </div>
                <div className='col-md-12 mb-3'>
                  <label >Discription*</label>
                  <textarea name="discription" value={data.discription} rows={4} placeholder='Enter discription about loan....' className={`form-control border-3 ${show && errormessage.discription ? "border-danger" : "border-primary"}`} onChange={inputdata}></textarea>
                  {show && errormessage.discription ? <p className='text-danger'>{show && errormessage.discription}</p> : null}
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
