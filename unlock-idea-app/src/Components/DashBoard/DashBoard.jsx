import React, { useState, useEffect } from "react";
import './Dashboard.css';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TrendDataJobList, TrendingDeveloperRoles } from "./TrendingJobData";
import useDashBoard from "./useDashBoard";
import { useNavigate, useParams } from "react-router-dom";
import { useSelectedRoleData } from "../Context/SelectedRoleContext";
import SelectedRole from "../SelectedRole/SelectedRole";
import NotPageFound from '../NotPageFound/NotPageFound';

const DashBoard = () => {
    const [selectedJob, setSelectedJob] = useState("");
    const { selectedRoleData, setSelectedRoleData } = useSelectedRoleData();
    const navigate = useNavigate();
    const { role } = useParams(); // Get role from URL
    const { handleClickRole } = useDashBoard();

    const validRoles = TrendDataJobList; // Assuming TrendDataJobList contains the valid roles
    const validDeveloperRoles = TrendingDeveloperRoles;

    useEffect(() => {
        if (role) {
            const decodedRole = decodeURIComponent(role);  // Decode the role
    
            if (!validRoles.includes(decodedRole) && !validDeveloperRoles.includes(decodedRole)) {
                navigate('/NotPageFound');
            } else {
                console.log("Decoded role:", decodedRole);
            }
        }
    }, [role, navigate, validRoles, validDeveloperRoles]);
    

    const handleChange = (event) => {
        const selectedRole = event.target.value;
        setSelectedJob(selectedRole);
        setSelectedRoleData({ SelectedRole: selectedRole });
    
        // Encode the role for the URL to handle slashes
        const encodedRole = encodeURIComponent(selectedRole);
        navigate(`/home/dashboard/${encodedRole}`);
    };
    

    // Only render the SelectedRole component if the role is valid
    if (role && (validRoles.includes(role) || validDeveloperRoles.includes(role))) {
        return <SelectedRole />;
    }

    return (
        <div className="dashboard-container">
            <div>
                <h2 style={{ fontSize: "22px", fontFamily: "Poppins, sans-serif", fontWeight: "500" }}>
                    Trending Jobs in Data Science
                </h2>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="job-select-label">Job Role</InputLabel>
                        <Select
                            labelId="job-select-label"
                            id="job-select"
                            value={selectedRoleData?.SelectedRole || ""}
                            label="Job Role"
                            onChange={handleChange}
                        >
                            {TrendDataJobList.map((job, index) => (
                                <MenuItem key={index} value={job} onClick={() => handleClickRole(job)}>
                                    {job}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </div>

            <div>
                <h2 style={{ fontSize: "22px", fontFamily: "Poppins, sans-serif", fontWeight: "500" }}>
                    Trending Jobs in Developer
                </h2>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="job-select-label">Job Role</InputLabel>
                        <Select
                            labelId="job-select-label"
                            id="job-select"
                            value={selectedRoleData?.SelectedRole || ""}
                            label="Job Role"
                            onChange={handleChange}
                        >
                            {TrendingDeveloperRoles.map((job, index) => (
                                <MenuItem key={index} value={job} onClick={() => handleClickRole(job)}>
                                    {job}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </div>
        </div>
    );
};

export default DashBoard;
