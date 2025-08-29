import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Createcontact, Getcontact } from "../Redux/ActionCreator/Contactactioncreator";
import Formvalidator from '../Validator/Formvalidator';

export default function Contact() {
    let dispatch = useDispatch();
    let contactStatedata = useSelector(state => state.contactStatedata)
    let [data, setdata] = useState({
        message: "",
        name: "",
        email: "",
        subject: ""
    })
    let [errormessage, seterrormessage] = useState({
        message: "Feild is Mandatory",
        name: "Feild is Mandatory",
        email: "Feild is Mandatory",
        subject: "Feild is Mandatory"
    })
    let [show, setshow] = useState(false);
    function inputdata(e) {
        let name = e.target.name;
        let value = e.target.value;

        let error = Formvalidator(e)

        seterrormessage((old) => {
            return {
                ...old,
                [name]: error
            }
        })

        setdata((old) => {
            return {
                ...old,
                [name]: value
            }
        })

    }
    function postdata(e) {
        let error = Object.values(errormessage).find((x) => x !== "");
        if (error) {
            setshow(true);
        } else {
            let item = contactStatedata.find((x) => x.email === data.email)
            if (item) {
                seterrormessage((old) => {
                    return {
                        ...old,
                        "name": "Same user Message Recently please try another time... "
                    }
                })
                return
            }
            dispatch(Createcontact({ ...data }))
            alert("Your message send sucessfully... we contact you as soon as possible")
        }
    }

    useEffect(() => {
        dispatch(Getcontact())
    }, [])
    return (
        <>
            <div className="row">
                <div className="col-12">
                    <h2 className="contact-title  mt-5 btn btn-primary w-100">Get in Touch</h2>
                </div>
                <div className="col-lg-8">
                    <form className="form-contact contact_form" onSubmit={postdata}>
                        <div className="row ms-4">
                            <div className="col-12">
                                <div className="form-group">
                                    <textarea className={`form-control w-100 border-3  ${show && errormessage.message ? "border-danger" : 'border-primary'} `} onChange={inputdata} name="message" id="message" cols="30" rows="6" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter Message'" placeholder=" Enter Message..."></textarea>
                                    {show && errormessage.message ? <p className='text-danger'>{errormessage.message}</p> : null}
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <input className={`form-control w-100 border-3 ${show && errormessage.name ? "border-danger" : 'border-primary'} `} name="name" onChange={inputdata} id="name" type="text" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter your name'" placeholder="Enter your name" />
                                    {show && errormessage.name ? <p className='text-danger'>{errormessage.name}</p> : null}
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <input className={`form-control w-100 border-3 ${show && errormessage.email ? "border-danger" : 'border-primary'} `} name="email" id="email" onChange={inputdata} type="email" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter email address'" placeholder="Email" />
                                    {show && errormessage.email ? <p className='text-danger'>{errormessage.email}</p> : null}
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <input className={`form-control w-100 border-3 ${show && errormessage.subject ? "border-danger" : 'border-primary'} `} name="subject" onChange={inputdata} id="subject" type="text" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter Subject'" placeholder="Enter Subject" />
                                    {show && errormessage.subject ? <p className='text-danger'>{errormessage.subject}</p> : null}
                                </div>
                            </div>
                        </div>
                        <div className="form-group mt-3">
                            <button type="submit" className="button button-contactForm btn btn-primary float-end mb-5">Send</button>
                        </div>
                    </form>
                </div>
                <div className="col-lg-3 offset-lg-1">
                    <div className="media contact-info">
                        <span className="contact-info__icon"><i className="ti-home"></i></span>
                        <div className="media-body">
                            <h3>Bihar East Champaran 845411</h3>
                            <p>Areaj, house No. 598</p>
                        </div>
                    </div>
                    <div className="media contact-info">
                        <span className="contact-info__icon"><i className="ti-tablet"></i></span>
                        <div className="media-body">
                            <h3>+91 8092492943</h3>
                            <p>Mon to Fri 9am to 6pm</p>
                        </div>
                    </div>
                    <div className="media contact-info">
                        <span className="contact-info__icon"><i className="ti-email"></i></span>
                        <div className="media-body">
                            <h3>Khush735265@gmail.com</h3>
                            <p>Send us your query anytime!</p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
