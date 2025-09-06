import React from "react"
export async function createRecord(collection, payload) {
    let responce =  fetch(`${process.env.REACT_APP_BACKEND_SERVER}${collection}`, {
        method: "POST",
        body: payload
    })
    return (await responce).json()
}
export async function createmultipleRecord(collection, payload) {
    let responce =  fetch(`${process.env.REACT_APP_BACKEND_SERVER}${collection}`, {
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
    let id = payload.get("_id");
    let responce = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}${collection}/update/${id}`, {
        method: "PUT",
        body: payload
    })
    return  responce.json()
}

export async function updatemultipleRecord(collection, payload) {
    let responce = fetch(`${process.env.REACT_APP_BACKEND_SERVER}${collection}/update/${payload.id}`, {
        method: "PUT",
        headers: {
        },
        body: payload
    })
    return (await responce).json()
}

export async function deleteRecord(collection, id) {
    let responce =  fetch(`${process.env.REACT_APP_BACKEND_SERVER}${collection}/delete/${id}`, {
        method: "DELETE",
    })
    return (await responce).json()
}