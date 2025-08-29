import React from 'react'
import { Link } from 'react-router-dom'

export default function Breadcrum({title}) {
    return (
        <>
            <nav aria-label="breadcrumb">
                <div className='breadcrumbbg text-light p-4'>
                    <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/" className='text-light text-decoration-none'>Home</Link></li>
                    <li className="breadcrumb-item active text-light" aria-current="page">{title}</li>
                </ol>
                </div>
            </nav>
        </>
    )
}
