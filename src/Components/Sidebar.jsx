import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar({ title }) {
    return (
        <>
            <div className="list-group">
                <Link to="/admin" className="list-group-item  bg-primary text-light p-3 mb-1 w-100">Home <i className='fa fa-home fs-4 float-end'></i></Link>
                <Link to="/admin/services" className="list-group-item  bg-primary text-light p-3 mb-1 w-100">Loan Services <i className='fa fa-university fs-5 float-end'></i></Link>
                <Link to="/admin/loanapplication" className="list-group-item  bg-primary text-light p-3 mb-1 w-100">Loan Applications <i className='fa fa-file-text fs-5 float-end'></i></Link>
                <Link to="/admin/payment" className="list-group-item  bg-primary text-light p-3 mb-1 w-100">Payment Section <i className='fa fa-credit-card fs-5 float-end'></i></Link>
                <Link to="/admin/repayment" className="list-group-item  bg-primary text-light p-3 mb-1 w-100">Repayment Section<i className='fa fa-undo fs-5 float-end'></i></Link>
                <Link to="/admin/testimonial" className="list-group-item  bg-primary text-light p-3 mb-1 w-100">Testimonials<i className='fa fa-comments fs-5 float-end'></i></Link>
                <Link to="/admin/team" className="list-group-item  bg-primary text-light p-3 mb-1 w-100">Team Members<i className='fa fa-users fs-5 float-end'></i></Link>
                <Link to="/admin/user" className="list-group-item  bg-primary text-light p-3 mb-1 w-100">Users<i className='fa fa-user fs-5 float-end'></i></Link>
                <Link to="/admin/contactus" className="list-group-item  bg-primary text-light p-3 mb-1 w-100">Contact Us<i className='fa fa-phone fs-5 float-end'></i></Link>
                {/* <Link to="/admin/newslatter" className="list-group-item  bg-primary text-light p-3 mb-1 w-100">Newslatters<i className='fa fa-envelope-open fs-5 float-end'></i></Link> */}
            </div>
        </>
    )
}
