import React, { useState, useEffect } from "react";
import { APIURL } from "../URL/url"
import axios from "axios";
import { useSelectedRoleData } from "../Context/SelectedRoleContext";

const useCreateProfile = () => {
  const ApiUrl = APIURL;
  const [allProfile, setAllProfiles] = useState(null);
  const [profileDetails, setProfileDetails] = useState({
    userName: "",
    userProfile: "",
    userEmail: "",
    userMobileNo: ""
  })
  const {createProfileTrigger,setCreateProfileTrigger}  = useSelectedRoleData()
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${ApiUrl}/getAllProfiles`);
      setAllProfiles(response.data)

    }
    fetchData()
  }, [ApiUrl])

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfileDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    console.log('Submitting Profile Details:', profileDetails);

    if (!profileDetails || Object.keys(profileDetails).length === 0) {
      console.error("Error: profileDetails is empty or undefined");
      return;
    }

    try {
      const response = await axios.post(`${ApiUrl}/insertProfileData`, { profileDetails });

      console.log("Success:", response.data);
      localStorage.setItem('userLoginProfile',profileDetails?.userProfile)
      setProfileDetails({
        userName: "",
        userProfile: "",
        userEmail: "",
        userMobileNo: ""
      })
      setCreateProfileTrigger(!createProfileTrigger)
    } catch (error) {
      console.error("Error submitting profile data:", error.response?.data || error.message);
    }
  };

  return {
    allProfile,
    profileDetails,
    handleChange,
    handleSubmit
  }
}
export default useCreateProfile;