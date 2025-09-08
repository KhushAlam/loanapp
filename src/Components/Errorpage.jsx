import React, { useEffect } from 'react'
import Breadcrum from './Breadcrum'
import { Link, Navigate, useNavigate } from 'react-router-dom'

export default function Error() {
  let navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      if (localStorage.getItem("login")) {
        if (localStorage.getItem("role") !== "User" && window.location.pathname === "/admin")
          navigate(0);
        if (localStorage.getItem("role") === "User" && window.location.pathname === "/profile")
          navigate(0);
      }
    }, 500);
  }, [window.location.href])
  return (
    <>
      <Breadcrum title="Errorpage" />
      <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="text-center">
          <h1 className="display-1 fw-bold text-primary">404</h1>
          <h4 className="mb-3">Oops! Page not found</h4>
          <p className="text-muted">
            The page you are looking for might have been removed <br />
            had its name changed, or is temporarily unavailable.
          </p>
          <p><strong>If you not login you can't to acces it!</strong></p>
          <Link to="/" className="btn btn-primary mt-3 px-4 py-2">
            Go Back Home
          </Link>
        </div>
      </div>
    </>
  )
}
