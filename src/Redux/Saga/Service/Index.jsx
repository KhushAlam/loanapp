import React from "react"
export async function createRecord(collection, payload) {
    let responce = fetch(`${process.env.REACT_APP_BACKEND_SERVER}${collection}`, {
        method: "POST",
        body:payload
    })
    return (await responce).json()
}
export async function createmultipleRecord(collection, payload) {
    let responce = fetch(`${process.env.REACT_APP_BACKEND_SERVER}${collection}`, {
        method: "POST",
        headers: {
        },
        body: payload
    })
    return (await responce).json()
}
export async function getRecord(collection) {
    let responce = fetch(`${process.env.REACT_APP_BACKEND_SERVER}${collection}`, {
        method: "GET",
        headers: {
            "content-type": "application/json"
        },
    })
    return (await responce).json()
}
export async function updateRecord(collection, payload) {
    let responce = fetch(`${process.env.REACT_APP_BACKEND_SERVER}${collection}/${payload.id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ ...payload })
    })
    return (await responce).json()
}

export async function updatemultipleRecord(collection, payload) {
    let responce = fetch(`${process.env.REACT_APP_BACKEND_SERVER}${collection}/${payload.id}`, {
        method: "PUT",
        headers: {
        },
        body: payload
    })
    return (await responce).json()
}

export async function deleteRecord(collection, payload) {
    let responce = fetch(`${process.env.REACT_APP_BACKEND_SERVER}${collection}/${payload.id}`, {
        method: "DELETE",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ ...payload })
    })
    return (await responce).json()
}