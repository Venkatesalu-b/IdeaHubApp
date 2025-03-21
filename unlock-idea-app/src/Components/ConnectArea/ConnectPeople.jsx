import React, { useState, } from "react";
import CreateProfile from "../createProfile/CreateProfile";
import GlobalConnect from "../GlobalConnect/GlobalConnect";
import useConnect from "./useConnect";
import { useSelectedRoleData } from "../Context/SelectedRoleContext";

const ConnectPeople = () => {
    const { } = useConnect()
    const { loginContextData } = useSelectedRoleData()

    return (
        <>
            <div>
                Connect page
            </div>
            <div>
                {loginContextData?.length === 1 ? <GlobalConnect /> :
                    <CreateProfile />
                }
            </div>
        </>
    )
}
export default ConnectPeople