import React, { useState, useEffect } from "react";
import { useSelectedRoleData } from "../Context/SelectedRoleContext";
import { useNavigate, useParams } from "react-router-dom";

const useDashBoard = () => {
    const { setSelectedRoleData } = useSelectedRoleData()
    const navigate = useNavigate();

    const handleClickRole = (job)=>{
        navigate(`/home/dashboard/${job}`)
    }
 

    return {
        handleClickRole
    }
}
export default useDashBoard;