import React,{useState,useEffect} from "react";
import { APIURL } from "../URL/url";
import axios from "axios";
import { useSelectedRoleData } from "../Context/SelectedRoleContext";

const useConnect = () => {
    const ApiUrl = APIURL;
    const [userLoginProfileData,setUserLoginProfileData] = useState(null);
    const userLoginEmail = localStorage.getItem("userLoginName");
    const {loginContextData,setLoginContextData,createProfileTrigger} = useSelectedRoleData()
    useEffect(() => {

      const fetchData = async () => {
          try {
              const response = await axios.get(`${ApiUrl}/userLoginProfileData`, {
                  params: { userLoginName: userLoginEmail },
              });
             
              if (response.data) {
                  setLoginContextData(response.data);
              } else {
              }
          } catch (error) {
              console.error("Error fetching user data:", error);
          }
      };

      fetchData();
  }, [userLoginEmail, ApiUrl,createProfileTrigger]);


    return {

    }
  }

export default useConnect;