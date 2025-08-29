import React from 'react'
import About from "../Components/About"
import Service from "../Components/Service"
import Values from '../Components/Values'
import Team from '../Components/Team'
import Testimonial from '../Components/Testimonial'
import Newslatters from '../Components/Newslatters'
import Breadcrum from '../Components/Breadcrum'

export default function Aboutpage() {
    return (
        <>
            <Breadcrum title="About us"/>
            <About />
            <Service />
            <Values />
            <Team />
            <Testimonial />
            <Newslatters />
        </>
    )
}
