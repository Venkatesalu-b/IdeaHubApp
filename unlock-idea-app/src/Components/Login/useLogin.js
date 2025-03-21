import  { useState, useEffect } from "react";
import axios from "axios";
import { APIURL } from "../URL/url";
import {  useNavigate } from 'react-router-dom';

const useLogin = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const ApiUrl = APIURL;
    const [error, setError] = useState(null);
    const [userNameData, setUserNameData] = useState(null);
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.username || !formData.password) {
            setError('Username and password are required.');
            return;
        }

        setError(null);
        console.log('Form Submitted', formData);
    };


    useEffect(() => {
        if (!formData.username) return;

        const fetchData = async () => {
            try {
                const response = await axios.get(`${ApiUrl}/getAllSignUpDatas`, {
                    params: { userLoginName: formData.username },
                });
                console.log(response.data, "uuuuuuuuuuu111111111111");

                if (response.data) {
                    setUserNameData([response.data]);
                    // setLoginContextData([response.data]);
                } else {
                    setUserNameData(null);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                setUserNameData(null);
            }
        };

        fetchData();
    }, [formData.username, ApiUrl]);
    const handleLogin = async () => {

        if (formData?.username === "") {
            return
        }
        if (userNameData[0]?.userName === formData?.username) {
            localStorage.setItem("userLoginName", formData?.username)
            navigate('/home')
            return
        }
        else {
            setError("enter Valid User name")
        }
    };
    return {
        formData, setFormData,
        handleSubmit,
        handleLogin,
        error

    }
}
export default useLogin;