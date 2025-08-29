import React from 'react';

export default function Filevalidator(e) {
    let { files, name } = e.target;

    switch (name) {
        case "pic":
            if (files.length === 0) {
                return name + " Pic Field is Mandatory";
            } else if (files.length === 1) {
                let file = files[0];
                if (file.size > 1048576) {
                    return "File is too large. Please upload file up to 1 MB";
                } else if (
                    file.type === "image/jpeg" ||
                    file.type === "image/jpg" ||
                    file.type === "image/png" ||
                    file.type === "image/gif"
                ) {
                    return "";
                } else {
                    return "Please upload .jpg, .jpeg, .png, or .gif image";
                }
            }
            break;

        case "aadharcard":
        case "pancard":
        case "salaryslip":
            if (files.length === 0) {
                return name + " Field is mandatory";
            } else if (files.length === 1) {
                let file = files[0];
                if (file.size > 204800) {
                    return name + " file is too big. Only up to 200 KB allowed!";
                } else if (file.type === "application/pdf") {
                    return "";
                } else {
                    return "File should be only in PDF format.";
                }
            }
            break;

        default:
            return "";
    }
}
