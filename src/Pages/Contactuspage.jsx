import React from 'react'
import Contact from '../Components/Contact'
import Breadcrum from '../Components/Breadcrum'

export default function Contactuspage() {
  return (
    <>
    <Breadcrum title="Contact Us"/>
    <div className="container-fluid">
      <div className="row"></div>
      <Contact/>
    </div>
    </>
  )
}
