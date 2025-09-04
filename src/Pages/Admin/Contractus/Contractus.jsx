import React, { useEffect, useState } from 'react'
import Sidebar from "../../../Components/Sidebar"
import Breadcrum from "../../../Components/Breadcrum"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Deletecontact, Getcontact } from "../../../Redux/ActionCreator/Contactactioncreator"

export default function Contractus() {
     let dispatch = useDispatch()
        let contactStatedata = useSelector(state => state.contactStatedata)
        let [data, setdata] = useState([]);
    
        function deletetestimonial(id) {
            if (window.confirm("Do you want to delete")) {
                let item = contactStatedata.find(x => x._id === id)
                if (item) {
                    dispatch(Deletecontact(item))
                }
            }
        }
        useEffect(() => {
            dispatch(Getcontact())
        }, [])
    
        useEffect(() => {
            if(Array.isArray(contactStatedata)){
                setdata(contactStatedata)
            }else{
                setdata([]);
            }
        }, [contactStatedata])

  return (
    <>
       <div className="container-fluid">
                      <Breadcrum title="Contractus Page" />
                      <div className="row mt-3">
                          <div className="col-md-3">
                              <Sidebar />
                          </div>
                          <div className="col-md-9">
                              <h4 className='btn btn-primary text-light text-center w-100'>Contact Section </h4>
                              <div className="table-resposive mt-3">
                                  <table className='table table-bordered table-striped table-hover text-center'>
                                      <thead >
                                          <tr>
                                              <th>ID</th>
                                              <th>Name</th>
                                              <th>Email</th>
                                              <th>Message</th>
                                              <th>Delete</th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                          {
                                              data.map((item, index) => {
                                                  return <tr key={index}>
                                                      <td>{item._id}</td>
                                                      <td>{item.name}</td>
                                                      <td>{item.email}</td>
                                                      <td><div className="overflow-y-scroll overflow-x-hidden h-[30px] w-[200px]">{item.message}</div></td>
                                                      <td><button className='btn btn-danger' onClick={() => { deletetestimonial(item._id) }}><i className='fa fa-trash text-light'></i></button></td>
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
