import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import HomePage from './Pages/HomePage'
import Aboutpage from './Pages/Aboutpage'
import Servicepage from './Pages/Servicepage'
import Testimonialpage from './Pages/Testimonialpage'
import Newslatterpage from './Pages/Newslatterpage'
import Teampage from './Pages/Teampage'
import Contactuspage from './Pages/Contactuspage'
import Login from './Components/Login'
import Adminpage from './Pages/Admin/Adminpage'
import Loanapplication from './Pages/Admin/Loanapplication/Loanapplication'
import Loanapplicationcreate from './Pages/Admin/Loanapplication/Loanapplicationcraete'
import Loanapplicationupdate from './Pages/Admin/Loanapplication/Loanapplicationupdate'
import Services from './Pages/Admin/Services/Services'
import Servicescreate from './Pages/Admin/Services/Servicescraete'
import Servicesupdate from './Pages/Admin/Services/Servicesupdate'
import Show from './Components/Show'
import Payment from './Pages/Admin/Payment/Payment'
import Testimonial from './Pages/Admin/Testimonial/Testimonial'
import Testimonialcreate from './Pages/Admin/Testimonial/Testimonialcreate'
import Testimonialupdate from './Pages/Admin/Testimonial/Testimonialupdate'
import Team from './Pages/Admin/Team/Team'
import Teamupdate from './Pages/Admin/Team/Teamupdate'
import Teamcreate from './Pages/Admin/Team/Teamcreate'
import User from './Pages/Admin/User/User'
import Usercreate from './Pages/Admin/User/Usercreate'
import Userupdate from './Pages/Admin/User/Userupdate'
import Contractus from './Pages/Admin/Contractus/Contractus'
import Repayment from './Pages/Admin/Repayment/Repayment'
import Singnup from './Components/Singnup'
import Business from './Components/Business'
import Personal from './Components/Personal'
import Commercial from './Components/Commercial'
import Construction from './Components/Construction'
import Loanapplicationuser from './Components/Loanapplicationuser'
import Welcome from './Components/Welcome'
import Profile from './Components/Profile'
import Updateprofile from './Components/Updateprofile'
import Repaymentstatus from './Components/Repaymentstatus'
import Errorpage from "./Components/Errorpage";


export default function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<Aboutpage />} />
          <Route path='/services' element={<Servicepage />} />
          <Route path='/testimonial' element={<Testimonialpage />} />
          <Route path='/newslatter' element={<Newslatterpage />} />
          <Route path='/team' element={<Teampage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Singnup />} />
          <Route path='/business' element={<Business />}></Route>
          <Route path='/commercial' element={<Commercial />}></Route>
          <Route path='/construction' element={<Construction />}></Route>
          <Route path='/personal' element={<Personal />}></Route>
          {localStorage.getItem("login") === "true" ? <>  <Route path='/welcome' element={<Welcome />}></Route>
            <Route path='/contact' element={<Contactuspage />} />
            <Route path='/profile' element={<Profile />}></Route>
            <Route path='/update/:id' element={<Updateprofile />}></Route>
            <Route path='/loan/application' element={<Loanapplicationuser />}></Route></> :
            <>
              <Route path='/*' element={<Errorpage />} />
            </>
          }


          {localStorage.getItem("login") === "true" &&
            localStorage.getItem("role") !== "User" ? (
            <>
              {/* Admin section */}
              <Route path='/admin' element={<Adminpage />} />

              {/* Loans Applications */}
              <Route path='/admin/loanapplication' element={<Loanapplication />} />
              <Route path='/admin/loanapplication/create' element={<Loanapplicationcreate />} />
              <Route path='/admin/loanapplication/update/:id' element={<Loanapplicationupdate />} />
              <Route path='/admin/loanapplication/show/:id' element={<Show />} />

              {/* Loans Services */}
              <Route path='/admin/services' element={<Services />} />
              <Route path='/admin/services/create' element={<Servicescreate />} />
              <Route path='/admin/services/update/:id' element={<Servicesupdate />} />

              {/* Payment Section */}
              <Route path='/admin/payment' element={<Payment />} />

              {/* Testimonial */}
              <Route path='/admin/testimonial' element={<Testimonial />} />
              <Route path='/admin/testimonial/create' element={<Testimonialcreate />} />
              <Route path='/admin/testimonial/update/:id' element={<Testimonialupdate />} />

              {/* Team */}
              <Route path='/admin/team' element={<Team />} />
              <Route path='/admin/team/create' element={<Teamcreate />} />
              <Route path='/admin/team/update/:id' element={<Teamupdate />} />

              {/* Users */}
              <Route path='/admin/user' element={<User />} />
              <Route path='/admin/user/create' element={<Usercreate />} />
              <Route path='/admin/user/update/:id' element={<Userupdate />} />

              {/* Contactus */}
              <Route path='/admin/contactus' element={<Contractus />} />

              {/* Repayment */}
              <Route path='/admin/repayment' element={<Repayment />} />
              <Route path='/admin/repayment/status/:id' element={<Repaymentstatus />} />
            </>
          ) : (
            <Route path='/*' element={<Errorpage />} />
          )}

        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}
