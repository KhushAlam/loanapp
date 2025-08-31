import React, { useEffect, useState } from 'react'
import Sidebar from "../../../Components/Sidebar"
import Breadcrum from "../../../Components/Breadcrum"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Deleteteam, Getteam } from "../../../Redux/ActionCreator/Teamactioncreator"


export default function Team() {
    let dispatch = useDispatch()
    let teamStatedata = useSelector(state => state.teamStatedata)
    let [data, setdata] = useState([]);
    console.log(data)

    function deletetestimonial(id) {
        if (window.confirm("Do you want to delete")) {
            let item = teamStatedata.find(x => x.id === id)
            console.log(item)
            if (item) {
                dispatch(Deleteteam(item))
            }
        }
    }
    useEffect(() => {
        dispatch(Getteam())
    }, [teamStatedata.length])

    useEffect(() => {
        setdata(teamStatedata)
    }, [teamStatedata])

    return (
        <>
            <div className="container-fluid">
                <Breadcrum title="Testimonial Page" />
                <div className="row mt-3">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h4 className='btn btn-primary text-light text-center w-100'>Team Section <Link to="/admin/team/create"><i className='fa fa-plus text-light float-end fs-5'></i></Link></h4>
                        <div className="table-resposive mt-3">
                            <table className='table table-bordered table-striped table-hover text-center'>
                                <thead >
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Work</th>
                                        <th>Pic</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((item, index) => {
                                            return <tr key={index}>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.work}</td>
                                                <td><Link to={`${process.env.REACT_APP_BACKEND_SERVER}${item.pic}`} target='_blank'>
                                                    <img src={`${item.pic}`} height={80} width={80} />
                                                </Link></td>
                                                <td><Link to={`/admin/team/update/${item.id}`}><button className='btn btn-primary'><i className='fa fa-edit text-light'></i></button></Link></td>
                                                <td><button className='btn btn-danger' onClick={() => { deletetestimonial(item.id) }}><i className='fa fa-trash text-light'></i></button></td>
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
