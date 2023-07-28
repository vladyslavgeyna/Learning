import React, {ComponentType, ReactElement, useContext} from "react";
import {AuthContext} from "../providers/AuthProvider";

export const withAuth = (Component: ComponentType) => (props:any) => {
    const {user} = useContext(AuthContext)
    if (!user) return <p>You are not authorized</p>
    return <Component {...props}/>
}