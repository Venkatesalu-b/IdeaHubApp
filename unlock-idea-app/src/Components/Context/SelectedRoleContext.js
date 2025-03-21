import React, { createContext, useContext, useState } from "react";

// Create Context
const SelectedRoleContext = createContext();

// Custom Hook to Use Context
export const useSelectedRoleData = () => {
    return useContext(SelectedRoleContext);
};

export const SelectedRoleDataProvider = ({ children }) => {
    const [selectedRoleData, setSelectedRoleData] = useState({
        SelectedRole: ""
    });
    const [loginContextData,setLoginContextData] = useState(null);
    const [allUserProfiles,setAllUserProfiles] = useState(null)
    const [signUpPopup,setSignUpPopup] = useState(false)
    const [createProfileTrigger,setCreateProfileTrigger] = useState(null);
    return (
        <SelectedRoleContext.Provider value={{ selectedRoleData, setSelectedRoleData,loginContextData,setLoginContextData,allUserProfiles,setAllUserProfiles,
            signUpPopup,setSignUpPopup,createProfileTrigger,setCreateProfileTrigger
         }}>
            {children}
        </SelectedRoleContext.Provider>
    );
};
