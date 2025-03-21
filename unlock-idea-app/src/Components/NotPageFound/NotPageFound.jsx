import React from "react";
import { useNavigate } from "react-router-dom";

const NotPageFound = ()=>{
    const navigate = useNavigate()
    const handleReturnHome = ()=>{
        navigate('/home/Dashboard')
    }
    return(
        <>
        <div>
            Not Page Found
        </div>
        <button onClick={handleReturnHome}>Return HomePage</button>
        </>
    )
}
export default NotPageFound