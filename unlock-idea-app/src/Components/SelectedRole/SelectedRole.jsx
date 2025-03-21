import React from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from "react-router-dom";
import { dataEngineerContent, fullStackDeveloperContent } from "./RoleDataContent/roleDataContent";

const roleDescriptions = {
    "Data Engineer": dataEngineerContent,
    "Full Stack Developer": fullStackDeveloperContent
};

const SelectedRole = () => {
    const { role } = useParams();
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/home/dashboard');
    };
    console.log(role,"roleeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
    

    return (
        <div>
            <div onClick={handleBack}>
                <ArrowBackIcon />
            </div>
            <h2>{role}</h2>
            <p style={{color:'#636160'}}>{roleDescriptions[role] || "Role description not available."}</p>
        </div>
    );
};

export default SelectedRole;
