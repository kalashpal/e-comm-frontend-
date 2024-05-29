import React from "react";
import { Navigate,Outlet } from "react-router-dom";
const PrivateComponent:React.FC=()=>{
    const auth=localStorage.getItem('user')
    return auth?<Outlet/>:<Navigate to='/SignUp'/>
}
export default PrivateComponent