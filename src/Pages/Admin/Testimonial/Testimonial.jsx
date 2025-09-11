import React, { useEffect, useState } from 'react'
import Sidebar from "../../../Components/Sidebar"
import Breadcrum from "../../../Components/Breadcrum"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Deletetestimonial, Gettestimonial } from "../../../Redux/ActionCreator/Testimonialactioncreator"


export default function Testimonial() {
    let dispatch = useDispatch()
    let testimonialStatedata = useSelector(state => state.testimonialStatedata)
    let [data, setdata] = useState([]);

    function deletetestimonial(id) {
        if (window.confirm("Do you want to delete")) {
            let item = testimonialStatedata.find(x => x._id === id)
            if (item) {
                dispatch(Deletetestimonial(item))
            }
        }
    }
    useEffect(() => {
        dispatch(Gettestimonial())
    }, [])

    useEffect(() => {
        if (Array.isArray(testimonialStatedata)) {
            setdata(testimonialStatedata)
        } else {
            setdata([]);
        }
    }, [testimonialStatedata])

    return (
        <>
            <Breadcrum title="Testimonial Page" />
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h4 className='btn btn-primary text-light text-center w-100'>Testimonails Section <Link to="/admin/testimonial/create"><i className='fa fa-plus text-light float-end fs-5'></i></Link></h4>
                        <div className="table-resposive mt-3">
                            <table className='table table-bordered table-striped table-hover text-center'>
                                <thead >
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Pic</th>
                                        <th>Discription</th>
                                        <th>Edit</th>
                                        {localStorage.getItem("role") === "Super Admin" ? <><th>Delete</th></> : null}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((item, index) => {
                                            return <tr key={index}>
                                                <td>{item._id?.slice(0, 4)}</td>
                                                <td>{item.name}</td>
                                                <td><Link to={`${item.pic}`} target='_blank'>
                                                    <img src={`${item.pic}`} height={80} width={80} />
                                                </Link></td>
                                                <td width={400} height={50}><div className='overflow-scroll overflow-x-hidden h-100 w-100'>{item.description}</div></td>
                                                <td><Link to={`/admin/testimonial/update/${item._id}`}><button className='btn btn-primary'><i className='fa fa-edit text-light'></i></button></Link></td>
                                                {localStorage.getItem("role") === "Super Admin" ? <>                                                <td><button className='btn btn-danger' onClick={() => { deletetestimonial(item._id) }}><i className='fa fa-trash text-light'></i></button></td>
                                                </> : null}
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
