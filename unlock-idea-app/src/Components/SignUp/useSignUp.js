import axios from "axios";
import React, { useState, useEffect } from "react";
import { APIURL } from "../URL/url";
import { useSelectedRoleData } from "../Context/SelectedRoleContext";

const useSignUp = () => {
    const [signUp, setSignUp] = useState({
        userName: "",
        userEmail: "",
        userPassword: ""
    });
    const { setSignUpPopup } = useSelectedRoleData()
    const ApiUrl = APIURL;
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignUp((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(signUp);
        try {
            const response = await axios.post(`${ApiUrl}/insertSignUpWithProfile`, {
                signUp: signUp
            })
            setSignUp({
                userName: "",
                userEmail: "",
                userPassword: ""
            })
            setSignUpPopup(false)

        }
        catch (err) {
            console.log(err);

        }

    };
    return {
        signUp,
        handleChange,
        handleSubmit
    }
}
export default useSignUp