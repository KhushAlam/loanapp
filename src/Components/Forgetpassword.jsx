import React, { useEffect, useState } from 'react'
import Breadcrum from "./Breadcrum"
import Formvalidator from '../Validator/Formvalidator'
import { Getusers } from "../Redux/ActionCreator/Usersactioncreator"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Forgetpassword() {
  let dispatch = useDispatch()
  let navigate = useNavigate()

  let usersStatedata = useSelector(state => state.usersStatedata);

  let [data, setdata] = useState({
    username: "",
    password: "",
  })
  let [errorMessage, seterrorMessage] = useState({
    username: "Feild is Mandatory",
    password: "Feild is Mandatory",
  })

  let [show, setshow] = useState(false);

  function inputdata(e) {
    let name = e.target.name;
    let value = e.target.value;

    let err = Formvalidator(e)
    seterrorMessage((old) => {
      return {
        ...old,
        [name]: err
      }
    })

    setdata((old) => {
      return {
        ...old,
        [name]: value,
      }
    })
  }

  async function postdata(e) {
    e.preventDefault();
    let error = Object.values(errorMessage).find(x => x !== "");
    if (error) {
      setshow(true)
    } else {


      let user = usersStatedata.find(x => x.username === data.username || x.email === data.username)
      if (!user) {
        seterrorMessage((old) => {
          return {
            ...old,
            "password": "Username Not Found Please Register Your Self"
          }
        })
        return
      } else {

        const Fromdata = new FormData()
        Object.keys(data).forEach((key) => {
          Fromdata.append(key, data[key])
        })

        let responce = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}user/forget`, {
          method: "PATCH",
          body: Fromdata
        })
        responce = await responce.json()


        navigate("/login")
      }
    }
  }

  useEffect(() => {
    dispatch(Getusers())
  }, [usersStatedata]);

  return (
    <>
      <Breadcrum title="Forget Password" />
      <div className="container-fluid">
        <h4 className='btn btn-primary w-100 text-light text-center mt-3'>Forget Your Password</h4>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6 mt-5 mb-5">
            <form onSubmit={postdata}>
              <input type="text" name="username" placeholder='Enter Your UserName or Email' className='border-3 border-primary form-control mb-3' onChange={inputdata} />
              <input type="password" name="password" placeholder='Enter Your New Password' className='border-3 border-primary form-control mb-3' onChange={inputdata} />
              <button type="submit" className='form-control btn btn-primary'>Change-Password</button>
            </form>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </>
  )
}
