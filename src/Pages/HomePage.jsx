import React from 'react'
import Home from "../Components/Home"
import About from "../Components/About"
import Service from "../Components/Service"
import Values from '../Components/Values'
import Team from '../Components/Team'
import Testimonial from '../Components/Testimonial'
import Newslatters from '../Components/Newslatters'
import Breadcrum from '../Components/Breadcrum'

export default function HomePage() {
  return (
    <>
    <Breadcrum/>
    <Home/>
    <About/>
    <Service/>
    <Values/>
    <Team/>
    <Testimonial/>
    <Newslatters/>
    </>
  )
}
