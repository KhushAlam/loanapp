import React from 'react'
import Service from "../Components/Service"
import Values from '../Components/Values'
import Team from '../Components/Team'
import Testimonial from '../Components/Testimonial'
import Newslatters from '../Components/Newslatters'
import Breadcrum from '../Components/Breadcrum'

export default function Servicepage() {
    return (
        <>
            <Breadcrum title="Services"/>
            <Service />
            <Values />
            <Team />
            <Testimonial />
            <Newslatters />
        </>
    )
}
