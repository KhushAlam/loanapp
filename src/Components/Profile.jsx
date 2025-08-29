import React from 'react'

export default function Profile({ title }) {
    return (
        <>
            <h4 className='btn btn-primary text-ligth text-center w-100 mt-2'>{title}</h4>
            <div className="row mt-4">
                <div className="col-12 col-md-6 mb-3">
                    <div className="pic mt-2 ms-1">
                        <img
                            src="/assets/img/team/download.png"
                            height={300}
                            width="80%"
                            style={{ objectFit: 'cover' }}
                            alt="Profile"
                        />
                    </div>
                </div>

                <div className="col-12 col-md-6 mt-3">
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped w-100">
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <td>Khush Alam</td>
                                </tr>
                                <tr>
                                    <th>Age</th>
                                    <td>25</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>khush@example.com</td>
                                </tr>
                                <tr>
                                    <th>Phone</th>
                                    <td>+91 9876543210</td>
                                </tr>
                                <tr>
                                    <th>City</th>
                                    <td>Delhi</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
