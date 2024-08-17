import React from 'react'
import {useUserProfile} from "../context/UserContext";
import { Navigate } from 'react-router-dom';

function PrivateRoute({children}) {
    const {userData} = useUserProfile();
    if(!userData || Object.keys(userData).length === 0){
        return <Navigate to="/auth" replace />;
    }
  return (
    children
  )
}

export default PrivateRoute