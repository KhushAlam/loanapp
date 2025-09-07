import React, { useState } from 'react'
import Breadcrum from './Breadcrum'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {

  let navigate = useNavigate()

  let [data, setdata] = useState({
    username: "",
    password: ""
  });

  let [errormessage, seterrormessage] = useState("");

  function inputdata(e) {
    let { name, value } = e.target;

    setdata((old) => {
      return {
        ...old,
        [name]: value
      }
    })
  }

  async function postdata(e) {
    e.preventDefault();
    let responce = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}user/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data) // 👈 body me data bhejna jaruri hai
    })

    responce = await responce.json();

    // assume backend yeh object return karega { user, token }
    const { user, token } = responce;

    if (user && user.active === "fa") {
      seterrormessage("Your account is Blocked please contact system admin for unblock");
    } else if (user) {
      localStorage.setItem("login", true)
      localStorage.setItem("name", user.name)
      localStorage.setItem("userid", user._id)
      localStorage.setItem("role", user.role)
      localStorage.setItem("token", token)

      if (user.role === "User") {
        navigate("/profile")
      } else if (!user.role) {
        navigate("/*")
      } else {
        navigate("/admin")
      }
    } else {
      seterrormessage("Username or password is invalid")
    }
  }

  return (
    <>
      <Breadcrum title="Login page :- Login into system" />
      <div className="container-fluid">
        <div className="row mb-5 justify-content-center align-items-center">
          <h4 className='btn btn-primary text-light  mb-5 w-100'>Login into System</h4>
          <div className="col-md-6 col-lg-6 mt-3">
            <form onSubmit={postdata}>
              <div className="mb-3">
                <input
                  type="text"
                  name="username"   // 👈 add kiya
                  placeholder="Enter username/email"
                  value={data.username}
                  onChange={inputdata}
                  className={`form-control form-control border-3 ${errormessage ? "border-danger" : "border-primary"}`}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  name="password"   // 👈 add kiya
                  value={data.password}
                  onChange={inputdata}
                  placeholder="Enter password"
                  className={`form-control form-control border-3 ${errormessage ? "border-danger" : "border-primary"}`}
                />
                {errormessage && <p className='text-danger'>{errormessage}</p>}
              </div>
              <div className="mb-3">
                <button
                  type="submit"
                  className="btn btn-primary btn w-100"
                >
                  Login
                </button>
              </div>
            </form>
            <div className="mb-3">
              <Link to="/forgetpassword" className="text-decoration-none">Forget your password</Link>
              <Link to="/signup" className='text-decoration-none float-end'>Create your account</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
