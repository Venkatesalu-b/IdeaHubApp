import React, { useState } from "react";
import { Outlet } from 'react-router-dom';
import SideBar from "../SideBar/Sidebar";
import { useNavigate } from "react-router-dom";
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useSelectedRoleData } from "../Context/SelectedRoleContext";
import './Home.css'
const Home = () => {
  const navigate = useNavigate()
  const {setLoginContextData} = useSelectedRoleData()
  const [drawer, setDrawer] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("userLoginEmail")
    setLoginContextData(null)
    navigate("/")
  }

  return (
    <>
      <div className='platform'>
        <div className="header-div">
          <p className="HeaderText">  IDEA-UP</p>
        </div>
        <div >
          <button className="LogoutButton" onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div style={{ display: "flex", height: "100vh", position: 'fixed' }}>

        <div className="nav-btn">
          <ToggleButtonGroup>
            <ToggleButton value="justify" aria-label="justified">
              <FormatAlignJustifyIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <SideBar />

        <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
          <Outlet />
        </div>
      </div>
    </>
  )
}
export default Home;