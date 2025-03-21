import React, { useState } from 'react';
import './LoginForm.css';
import axios from 'axios';
import agricultureBackground from '../../assets/agriculturebackground.mp4';
import IdeaUp from "../../assets/IdeaUp.mp4"
import { Navigate, useNavigate } from 'react-router-dom';
import useLogin from './useLogin';
import SignUp from '../SignUp/SignUp';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useSelectedRoleData } from '../Context/SelectedRoleContext';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    height:350,
    bgcolor: 'background.paper',
    // boxShadow: 24,
    p: 4,
};

const LoginForm = () => {
    const {  formData, setFormData,
        handleSubmit,
        handleLogin,
        error} = useLogin();
const [signUpModal,setSignUpModal] = useState(false);
const {signUpPopup,setSignUpPopup} = useSelectedRoleData();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleClose = () => {
        setSignUpPopup(false);
    };
    const handleSignup = ()=>{
        setSignUpPopup(true)
    }
    
    return (
        <div className="login-form">
            <video src={IdeaUp} autoPlay loop muted className="background-video" />

            <div className="form-container">
                <h2 className='headername'>Login</h2>
                <form onSubmit={handleSubmit} className='mainform'>
                    <div className='input-field'>
                        <label className='label' htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className='inputLoginpage'
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className='input-field'>
                        <label className='label' htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className='inputLoginpage'
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    {error && <p>{error}</p>}
                    <div className='Login-buttondiv'>
                        <button className='Login-button' type="submit" onClick={() => handleLogin()}>Login</button>
                    </div>
                    <div>
                        <p className='signup' onClick={handleSignup}>Sign Up?</p>
                    </div>
                </form>
            </div>
            <Modal
                open={signUpPopup}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <SignUp />
                </Box>
            </Modal>
        </div>
    );
};

export default LoginForm;
