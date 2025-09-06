import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
    return (
        <>
            <nav className='top-header bg-primary h-10 w-100 text-light overflow-hidden'>
                <div className="row">
                    <div className="col-md-9 col-md-6">
                        <Link to="" target='_blank' rel='noreffrel' className='text-decoration-none'><i className='fa fa-envelope text-light ms-3 me-1  pt-2 pb-2'></i><span className='text-light d-none d-md-inline fs-6 '>khush735265@gmail.com</span></Link>
                        <Link to="" target='_blank' rel='noreffrel' className='text-decoration-none'><i className='fa fa-phone text-light ms-3 me-1 pt-2 pb-2'></i><span className='text-light d-none d-md-inline fs-6'>8092492943</span></Link>
                        <Link to="" target='_blank' rel='noreffrel' className='text-decoration-none'><i className='fa fa-whatsapp text-light ms-3 me-1 pt-2 pb-2'></i><span className='text-light d-none d-md-inline fs-6 '>7324935063</span></Link>
                    </div>
                    <div className="col-md-3 ">
                        <Link to="" target='_blank' className='float-end' rel='noreffrel'><i className='bi bi-twitter text-light ms-3 me-1 pt-3 fs-4 pb-2'></i></Link>
                        <Link to="" target='_blank' className='float-end' rel='noreffrel'><i className='bi bi-youtube text-light ms-3 me-1 pt-3 fs-4 pb-2'></i></Link>
                        <Link to="" target='_blank' className='float-end' rel='noreffrel'><i className='bi bi-instagram text-light ms-3 me-1 pt-3 fs-4 pb-2'></i></Link>
                        <Link to="" target='_blank' className='float-end' rel='noreffrel'><i className='bi bi-facebook text-light ms-3 me-1 pt-3 fs-4 pb-2'></i></Link>
                        <Link to="" target='_blank' className='float-end' rel='noreffrel'><i className='bi bi-linkedin text-light ms-6 me-1 pt-3 fs-4 pb-2'></i></Link>
                    </div>
                </div>

            </nav>
            <nav className="navbar navbar-expand-lg bg-light sticky-top">
                <div className="container-fluid">
                    <div className="col-xl-2 col-lg-2 col-md-1">
                        <div className="logo">
                            <Link to="/"><img src="/assets/img/logo/logo.png" alt="" /></Link>
                        </div>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item me-3">
                                <NavLink to="/" className="nav-link">Home</NavLink>
                            </li>
                            <li className="nav-item me-3">
                                <NavLink to="/about" className="nav-link">About</NavLink>
                            </li>
                            <li className="nav-item me-3">
                                <NavLink to="/services" className="nav-link">Services</NavLink>
                            </li>
                            <li className="nav-item me-3">
                                <NavLink to="/testimonial" className="nav-link">Tesimonial</NavLink>
                            </li>
                            <li className="nav-item me-3">
                                <NavLink to="/newslatter" className="nav-link">Newslatter</NavLink>
                            </li>
                            <li className="nav-item me-3">
                                <NavLink to="/team" className="nav-link">Team Members</NavLink>
                            </li>
                            <li className="nav-item me-3">
                                <NavLink to="/contact" className="nav-link ">Contact US</NavLink>
                            </li>
                            <li className="nav-item me-3">
                                <NavLink to="/admin" className="nav-link ">Admin</NavLink>
                            </li>
                            <li className="nav-item me-3">
                                {localStorage.getItem("login")==="true"? (<button className='btn btn-primary h-80 text-capitalize'>{localStorage.getItem("name")}</button>):
                                 (<button className='btn btn-primary h-80'><NavLink to="/login" className="text-light text-capitalize text-decoration-none">Login</NavLink></button>)}
                            </li>

                        </ul>

                    </div>
                </div>
            </nav>
        </>
    )
}
