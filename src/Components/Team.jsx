import React, { useEffect } from 'react'
import { Getteam } from "../Redux/ActionCreator/Teamactioncreator"
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

export default function Team() {
    let dispatch = useDispatch();
    let teamStatedata = useSelector(state => state.teamStatedata);
    useEffect(() => {
        dispatch(Getteam());
    }, [teamStatedata.length])

    return (
        <>
            <h3 className='btn btn-primary w-100 mt-3'>Our Loan App Team Section</h3>
            <div className="team-area section-padding30">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="cl-xl-7 col-lg-8 col-md-10">
                            <div className="section-tittle text-center mb-70">
                                <span>Our Loan Section Team Mambers</span>
                                <h2>Take a look to our professional team members.</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                     {teamStatedata.map((item,index)=>{
                        return <div className="col-lg-3 col-md-4 col-sm-6" key={index}>
                        <div className="single-team mb-30">
                            <div className="team-img">
                                <img src={`${process.env.REACT_APP_BACKEND_SERVER}${item.pic}`}/>
                                <div className="team-social">
                                    <li><Link to=''><i className="fab fa-facebook-f "></i></Link></li>
                                    <li><Link to=''><i className="fab fa-twitter "></i></Link></li>
                                    <li><Link to=''><i className="fas fa-globe "></i></Link></li>
                                </div>
                            </div>
                            <div className="team-caption">
                                <h3>{item.name}</h3>
                                <p>Volunteer leader</p>
                            </div>
                        </div>
                    </div>
                     })}
                    </div>
                </div>
            </div>
        </>
    )
}
