import React from "react";
import { Link } from "react-router-dom"

function ScanButton({finish}) {

    return (
        <Link to={finish ? "" :"/qr"} className={`text-white py-3 rounded-xl text-center ${finish? "bg-gray-600 cursor-not-allowed" : "bg-blue-600"}`}>
            Scan
        </Link>
    );
} 

export default ScanButton